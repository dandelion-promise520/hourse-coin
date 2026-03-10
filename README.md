# 纪念币预约助手 (Coin Reservation Helper)

![license](https://img.shields.io/github/license/dandelion-promise520/horse-coin)
![stars](https://img.shields.io/github/stars/dandelion-promise520/horse-coin)
![issues](https://img.shields.io/github/issues/dandelion-promise520/horse-coin)

> 一个用于 **快速填写纪念币预约表单信息** 的浏览器扩展插件，减少重复输入操作。

---

# ✨ 功能特性

- 📄 **信息管理**  
  管理多组预约信息（姓名、身份证号、手机号、预约网点、预约数量）

- ⚡ **一键填写**  
  点击按钮即可自动填写预约表单

- 🔄 **自动填充**  
  支持设置默认信息，页面加载后自动填充

- 🏦 **银行快捷入口**  
  提供各大银行纪念币预约页面的快捷访问

- 🔒 **本地数据存储**  
  所有数据仅存储在本地浏览器中，不会上传到任何服务器

---

# 🖼 界面预览

<img width="647" height="628" alt="preview" src="https://github.com/user-attachments/assets/78e3bc0b-24fd-4a77-8f34-817b916329d2" />

---

# 🚀 安装方式

## 方法一：安装 Release 版本

1. 下载 Release 中的 `chrome-mv3.zip`
2. 解压到本地目录
3. 打开浏览器扩展页面（Chrome: `chrome://extensions/`）
4. 打开 **开发者模式**
5. 点击 **加载已解压的扩展程序**
6. 选择解压后的文件夹

---

## 方法二：从源码安装

### 1. 克隆项目

```bash
git clone https://github.com/dandelion-promise520/horse-coin
```

### 2. 进入项目

```bash
cd horse-coin
```

### 3. 安装依赖

```bash
pnpm install
```

### 4. 构建插件

```bash
pnpm build
```

### 5. 加载插件

浏览器加载目录：`dist/chrome-mv3`

---

# 📖 使用指南

1. 点击浏览器工具栏中的插件图标
2. 打开侧边栏界面
3. 点击 **新增** 添加预约信息
4. 可设置 **默认信息**
5. 通过快捷入口进入银行预约页面
6. 点击 **填写** 自动填充表单

---

# 🏦 支持的银行

目前支持以下银行预约页面：

- 交通银行
- 中国银行
- 农业银行
- 工商银行
- 建设银行
- 华夏银行
- 邮储银行
- 苏州银行

如有新的预约银行页面欢迎提交 PR。

---

# 🛠 技术栈

| 技术         | 说明                  |
| ------------ | --------------------- |
| WXT          | Web Extension Toolkit |
| React 19     | 前端框架              |
| TypeScript   | 类型系统              |
| Ant Design   | UI 组件库             |
| Tailwind CSS | 样式方案              |
| Biome        | 代码规范              |
| pnpm         | 包管理                |

---

# 🧑‍💻 开发指南

## 安装依赖
pnpm install

## 开发模式

**Chrome**

```bash
pnpm dev
```

**Firefox**

```bash
pnpm dev:firefox
```

---

## 构建

**Chrome**

```bash
pnpm build
```

**Firefox**

```bash
pnpm build:firefox
```

---

# 🔐 隐私与安全

- 本插件 **不会上传任何个人信息**
- 所有数据 **仅存储在浏览器本地**
- 不包含任何远程服务器请求
- 不收集任何用户数据

---

# ⚠️ 免责声明

本项目仅用于 **技术学习与研究目的**。

本插件仅提供 **表单自动填写功能**，不会绕过网站验证机制，也不会进行批量请求或自动化抢购。

使用本项目所产生的一切后果由使用者自行承担。  
请在使用时遵守相关网站的服务条款以及当地法律法规。

---

# 📜 License

MIT License

---

# 🤝 贡献

欢迎提交：

- Issue
- Pull Request
- 功能建议

如果这个项目对你有帮助，欢迎 ⭐ Star 支持。