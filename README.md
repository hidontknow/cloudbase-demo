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

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
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
