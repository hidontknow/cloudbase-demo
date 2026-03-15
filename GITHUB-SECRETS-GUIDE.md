# 🔐 GitHub Secrets 配置指南

## 目标

配置 GitHub Actions 自动部署所需的 4 个 Secrets。

---

## 📋 需要配置的 Secrets

| 序号 | Secret 名称 | 说明 | 状态 |
|------|-----------|------|------|
| 1 | `TCB_SECRET_ID` | 腾讯云 API 密钥 ID | ❌ 待配置 |
| 2 | `TCB_SECRET_KEY` | 腾讯云 API 密钥 Key | ❌ 待配置 |
| 3 | `TCB_ENV_ID` | CloudBase 环境 ID | ✅ 已有 |
| 4 | `VITE_PUBLISHABLE_KEY` | 客户端访问密钥 | ✅ 已有 |

---

## 🚀 快速配置步骤

### 步骤 1：打开 Secrets 配置页面

👉 **点击打开**：https://github.com/hidontknow/cloudbase-demo/settings/secrets/actions

---

### 步骤 2：获取腾讯云 SecretId 和 SecretKey

👉 **点击打开**：https://console.cloud.tencent.com/cam/capi

1. 登录腾讯云账号
2. 点击「**新建密钥**」按钮
3. 复制生成的 **SecretId**（格式类似：`AKIDxxxxxxxxxxxxxxxx`）
4. 复制生成的 **SecretKey**（格式类似：`xxxxxxxxxxxxxxxx`）
5. ⚠️ **重要**：SecretKey 只显示一次，请立即保存！

---

### 步骤 3：添加 Secrets

在 GitHub Secrets 页面，依次添加：

#### 1️⃣ 添加 TCB_SECRET_ID

- **Name**: `TCB_SECRET_ID`
- **Value**: 粘贴刚才复制的 SecretId
- 点击「Add secret」

#### 2️⃣ 添加 TCB_SECRET_KEY

- **Name**: `TCB_SECRET_KEY`
- **Value**: 粘贴刚才复制的 SecretKey
- 点击「Add secret」

#### 3️⃣ 添加 TCB_ENV_ID

- **Name**: `TCB_ENV_ID`
- **Value**: `test-0g2g25k4a65e8da2`
- 点击「Add secret」

#### 4️⃣ 添加 VITE_PUBLISHABLE_KEY

- **Name**: `VITE_PUBLISHABLE_KEY`
- **Value**: 之前已经配置过的 Publishable Key（JWT 格式）
- 点击「Add secret」

---

### 步骤 4：验证配置

添加完成后，Secrets 列表应该显示：

```
✅ TCB_SECRET_ID      (Added just now)
✅ TCB_SECRET_KEY     (Added just now)
✅ TCB_ENV_ID         (Added just now)
✅ VITE_PUBLISHABLE_KEY (Added just now)
```

---

## 🧪 测试自动部署

### 方法 1：推送代码触发

```bash
cd config
git add .
git commit -m "chore: 更新部署配置"
git push
```

推送后会自动触发部署：
- 访问 https://github.com/hidontknow/cloudbase-demo/actions
- 查看 "Deploy to CloudBase" workflow 运行状态

### 方法 2：手动触发

1. 访问 https://github.com/hidontknow/cloudbase-demo/actions
2. 点击左侧 "Deploy to CloudBase"
3. 点击 "Run workflow" 按钮
4. 选择 "main" 分支
5. 点击 "Run workflow"

---

## ✅ 验证部署成功

部署成功后：

1. **查看部署日志**：
   - 所有步骤显示绿色 ✅
   - "Deploy to CloudBase" 步骤显示 "deploy success"

2. **访问应用**：
   - 打开 CloudBase 静态托管 URL
   - 测试添加待办功能
   - 检查浏览器控制台无错误

3. **检查文件版本**：
   - 访问 https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/static-hosting
   - 确认文件已更新（时间戳应该是最新的）

---

## 🔍 故障排查

### 问题 1：部署失败 - "permission denied"

**原因**：SecretId/SecretKey 权限不足

**解决**：
1. 检查 SecretId/SecretKey 是否正确复制（无空格）
2. 确认该密钥有 CloudBase 管理权限
3. 重新创建密钥并更新 Secrets

### 问题 2：部署成功但功能仍失败

**原因**：Publishable Key 未正确注入

**解决**：
1. 检查 `VITE_PUBLISHABLE_KEY` Secret 是否正确配置
2. 查看 workflow 日志，确认 "Setup environment variables" 步骤创建了 .env 文件
3. 重新触发部署

### 问题 3：环境变量未生效

**原因**：Vite 缓存问题

**解决**：
```yaml
# 在 workflow 中添加清理步骤
- name: Clean cache
  run: rm -rf node_modules/.vite
```

---

## 📚 相关文件

- [deploy.yml](.github/workflows/deploy.yml) - GitHub Actions 工作流配置
- [.env.example](.env.example) - 环境变量模板
- [README.md](README.md) - 项目说明文档

---

## 💡 最佳实践

1. **定期轮换密钥**：每 3-6 个月更新一次 SecretId/SecretKey
2. **最小权限原则**：只授予必要的权限
3. **监控部署日志**：定期检查 GitHub Actions 日志
4. **备份密钥**：安全保存密钥副本，防止丢失

---

配置完成后，每次推送代码都会自动部署！🎉
