import { useEffect, useState } from "react";
import cloudbase from "../utils/cloudbase";

interface Todo {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // 加载待办事项
  const loadTodos = async () => {
    try {
      const { data } = await cloudbase.db
        .collection("todos")
        .orderBy("createdAt", "desc")
        .get();
      setTodos(data as Todo[]);
    } catch (error) {
      console.error("加载待办失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // 添加待办
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await cloudbase.db.collection("todos").add({
        title: newTitle.trim(),
        description: newDesc.trim(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setNewTitle("");
      setNewDesc("");
      loadTodos();
    } catch (error) {
      console.error("添加待办失败:", error);
      alert("添加失败，请重试");
    }
  };

  // 切换完成状态
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await cloudbase.db.collection("todos").doc(id).update({
        completed: !completed,
        updatedAt: Date.now(),
      });
      loadTodos();
    } catch (error) {
      console.error("更新待办失败:", error);
    }
  };

  // 删除待办
  const deleteTodo = async (id: string) => {
    if (!confirm("确定删除这个待办吗？")) return;
    try {
      await cloudbase.db.collection("todos").doc(id).remove();
      loadTodos();
    } catch (error) {
      console.error("删除待办失败:", error);
    }
  };

  // 过滤待办
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold">📝 待办事项</h1>
        <p className="text-sm opacity-70">
          共 {stats.total} 项 · 未完成 {stats.active} 项 · 已完成 {stats.completed} 项
        </p>
      </div>

      {/* 添加表单 */}
      <form onSubmit={addTodo} className="mb-6 space-y-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="输入待办标题..."
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="描述（可选）"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          ➕ 添加待办
        </button>
      </form>

      {/* 过滤器 */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`btn btn-sm ${filter === "all" ? "btn-active" : ""}`}
        >
          全部 ({stats.total})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`btn btn-sm ${filter === "active" ? "btn-active" : ""}`}
        >
          未完成 ({stats.active})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`btn btn-sm ${filter === "completed" ? "btn-active" : ""}`}
        >
          已完成 ({stats.completed})
        </button>
      </div>

      {/* 待办列表 */}
      {loading ? (
        <div className="text-center py-8">
          <span className="loading loading-spinner" />
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-8 opacity-50">
          <p>暂无待办事项</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              className={`card bg-base-100 shadow-sm ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <div className="card-body p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      todo._id && toggleTodo(todo._id, todo.completed)
                    }
                    className="checkbox checkbox-sm mt-1"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm opacity-70 mt-1">
                        {todo.description}
                      </p>
                    )}
                    <p className="text-xs opacity-50 mt-2">
                      {new Date(todo.createdAt).toLocaleString("zh-CN")}
                    </p>
                  </div>
                  <button
                    onClick={() => todo._id && deleteTodo(todo._id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
