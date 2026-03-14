# 📝 待办事项应用

基于 React + CloudBase 的待办事项管理应用。

## 🚀 功能特性

- ✅ 添加待办事项
- ✅ 标记完成/未完成
- ✅ 删除待办
- ✅ 筛选过滤（全部/未完成/已完成）
- ✅ 实时同步到 CloudBase 文档数据库
- ✅ 响应式设计，支持移动端

## 📦 技术栈

- **前端**: React + TypeScript + Vite
- **UI**: DaisyUI (Tailwind CSS)
- **后端**: CloudBase 云开发
- **数据库**: CloudBase NoSQL 文档数据库

## 🛠️ 开发

### 1️⃣ 配置环境变量

复制环境变量配置文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置 **Publishable Key**：

```bash
VITE_ENV_ID=test-0g2g25k4a65e8da2
VITE_PUBLISHABLE_KEY=你的 publishable_key
```

**获取 Publishable Key 步骤**：

1. 访问 [CloudBase 控制台 - API 密钥管理](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/env/apikey)
2. 使用腾讯云账号登录
3. 点击「生成密钥」或复制现有的「Publishable Key」
4. 粘贴到 `.env` 文件中

### 2️⃣ 安装依赖

```bash
npm install
```

### 3️⃣ 启动开发服务器

```bash
npm run dev
```

### 4️⃣ 配置数据库权限（重要！）

在 CloudBase 控制台配置 `todos` 集合的读写权限：

1. 访问 [数据库管理](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/db/doc)
2. 选择 `todos` 集合
3. 点击「权限管理」标签
4. 设置权限为：**所有用户可读写**（或自定义权限规则）

**权限规则示例**（允许所有用户读写）：

```json
{
  "read": "auth.openid != null",
  "write": "auth.openid != null"
}
```

**或者完全公开**（测试用）：

```json
{
  "read": true,
  "write": true
}
```

## 🌐 部署

### 方式一：手动上传（推荐）

1. 访问 [CloudBase 控制台 - 静态托管](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/static-hosting)
2. 使用腾讯云账号登录
3. 点击「上传文件」
4. 选择 `dist` 目录下的所有文件上传

### 方式二：使用 CLI

```bash
# 构建
npm run build

# 部署到 CloudBase 静态托管
tcb framework deploy
```

### 方式三：使用 MCP（需要修复状态保持问题）

```bash
# 绑定环境
npx mcporter call cloudbase.auth action=set_env envId=test-0g2g25k4a65e8da2

# 上传文件
npx mcporter call cloudbase.uploadFiles localPath=./dist cloudPath=/
```

## 📊 数据库结构

**集合**: `todos`

```typescript
interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}
```

## 🔗 CloudBase 环境

- **环境 ID**: `test-0g2g25k4a65e8da2`
- **区域**: 上海 (ap-shanghai)

## 📱 控制台

- [CloudBase 控制台](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2)
- [数据库管理](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/db/doc)
- [静态托管](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/static-hosting)

## 🔑 GitHub Secrets 配置

如需使用 GitHub Actions 自动部署，需在 GitHub 仓库设置中添加以下 Secrets：

1. 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Secrets：

| Name | Value | 获取方式 |
|------|-------|----------|
| `TCB_SECRET_ID` | 你的腾讯云 SecretId | [腾讯云控制台 - 密钥管理](https://console.cloud.tencent.com/cam/capi) |
| `TCB_SECRET_KEY` | 你的腾讯云 SecretKey | 同上，创建密钥时保存 |
| `TCB_ENV_ID` | `test-0g2g25k4a65e8da2` | 当前环境 ID |

3. 推送代码到 `main` 分支或手动触发 workflow 即可自动部署
