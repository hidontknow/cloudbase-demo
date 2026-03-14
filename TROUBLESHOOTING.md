# 🔧 故障排查指南

## 问题：添加待办失败

### 可能原因及解决方案

#### 原因 1：Publishable Key 未配置 ⭐ 最常见

**症状**：
- 控制台显示 "客户端 Publishable Key 未配置" 警告
- 添加待办时没有任何反应或报错

**解决方案**：

1. **获取 Publishable Key**：
   - 访问：https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/env/apikey
   - 登录腾讯云账号
   - 点击「生成密钥」（如果没有现成的）
   - 复制 **Publishable Key**（以 `pub-` 开头）

2. **配置环境变量**：
   ```bash
   # 在项目根目录创建 .env 文件
   cp .env.example .env
   
   # 编辑 .env 文件，填入 Publishable Key
   VITE_ENV_ID=test-0g2g25k4a65e8da2
   VITE_PUBLISHABLE_KEY=pub-xxxxxxxxxxxxx
   ```

3. **重新构建并部署**：
   ```bash
   npm run build
   # 推送代码触发自动部署
   git add .env
   git commit -m "chore: 添加环境变量配置"
   git push
   ```

---

#### 原因 2：数据库权限未配置

**症状**：
- 可以加载待办列表，但添加/更新/删除失败
- 控制台报错：`errCode: -502001, errMsg: permission denied`

**解决方案**：

1. **访问数据库权限管理**：
   - https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/db/doc

2. **选择 `todos` 集合**

3. **点击「权限管理」标签**

4. **设置权限**（选择以下一种）：

   **方案 A：所有登录用户可读写（推荐）**
   ```json
   {
     "read": "auth.openid != null",
     "write": "auth.openid != null"
   }
   ```

   **方案 B：完全公开（仅测试用）**
   ```json
   {
     "read": true,
     "write": true
   }
   ```

   **方案 C：仅创建者可读写自己数据**
   ```json
   {
     "read": "auth.openid == resource.openid",
     "write": "auth.openid == resource.openid"
   }
   ```

5. **保存配置**

---

#### 原因 3：数据库集合不存在

**症状**：
- 控制台报错：`collection not found`

**解决方案**：

1. **手动创建集合**：
   - 访问 [数据库管理](https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2#/db/doc)
   - 点击「添加集合」
   - 输入集合名称：`todos`
   - 点击「确定」

2. **或者通过代码自动创建**：
   - 第一次添加待办时会自动创建集合

---

#### 原因 4：环境变量未生效

**症状**：
- 修改了 `.env` 文件但问题依然存在
- 控制台仍然显示 Key 未配置

**解决方案**：

1. **重启开发服务器**：
   ```bash
   # 停止当前运行的 npm run dev
   # 重新运行
   npm run dev
   ```

2. **清除缓存**：
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **检查 .env 文件位置**：
   - 确保 `.env` 文件在 `config/` 目录下（与 `package.json` 同级）
   - 确保文件名是 `.env` 而不是 `.env.txt`

---

### 快速诊断步骤

1. **打开浏览器开发者工具**（F12）

2. **查看控制台日志**：
   - 是否有 "客户端 Publishable Key 未配置" 警告？
   - 是否有权限错误（permission denied）？
   - 是否有网络请求失败？

3. **检查 Network 标签**：
   - 查找失败的请求
   - 查看请求的响应内容和错误信息

4. **测试数据库连接**：
   ```javascript
   // 在浏览器控制台运行
   fetch('https://tcb.cloud.tencent.com/dev?envId=test-0g2g25k4a65e8da2')
     .then(r => r.text())
     .then(console.log)
   ```

---

### 联系支持

如果以上方法都无法解决问题，请提供：

1. 浏览器控制台的完整错误信息
2. Network 标签中失败请求的详情
3. 你的配置步骤（已做哪些配置）

这将帮助更快地定位问题。
