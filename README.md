# 纪念币预约 - 浏览器插件

> 一个帮助您快速填充个人信息以提升纪念币预约成功率的浏览器扩展插件

## 功能特性

- **信息管理**：管理多组预约信息（姓名、身份证号、手机号、预约网点、预约数量）
- **快速填写**：一键自动填充表单，提升预约速度
- **默认填充**：支持设置默认填充信息，页面加载时自动填充
- **银行快捷入口**：提供各大银行纪念币预约页面快捷链接
- **数据本地存储**：所有信息安全存储在本地浏览器中

## 界面预览

![界面预览](https://github.com/user-attachments/assets/69d5b00b-b2ee-4e2b-939c-7830c4df698b)

## 安装使用

### 方法一：直接安装

1. 下载 Release 中发布的 `chrome-mv3.zip` 文件
2. 解压压缩包到本地目录
3. 打开浏览器扩展管理页面（Chrome: `chrome://extensions/`）
4. 开启右上角的「开发者模式」
5. 将解压后的文件夹拖拽到扩展页面中

### 方法二：从源码安装

1. 克隆仓库到本地
2. 安装依赖：`pnpm install`
3. 构建项目：`pnpm build`
4. 按照方法一的步骤安装 `dist/chrome-mv3` 目录

## 使用指南

1. 点击浏览器工具栏的扩展图标打开侧边栏
2. 点击「新增」按钮添加预约信息
3. 设置默认填充信息（可选）
4. 在侧边栏点击对应银行的链接打开预约页面
5. 点击「填写」按钮自动填充表单，或等待页面加载后自动填充

## 支持的银行

- 交通银行
- 中国银行
- 农业银行
- 工商银行
- 建设银行
- 华夏银行
- 储蓄银行
- 苏州银行

## 技术栈

- **框架**: WXT (Web Extension Toolkit)
- **前端**: React 19 + TypeScript
- **UI 库**: Ant Design 6
- **样式**: Tailwind CSS 4
- **代码规范**: Biome
- **包管理**: pnpm

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# Chrome
pnpm dev

# Firefox
pnpm dev:firefox
```

### 构建

```bash
# Chrome
pnpm build

# Firefox
pnpm build:firefox
```

### 打包

```bash
# Chrome
pnpm zip

# Firefox
pnpm zip:firefox
```

### 代码检查

```bash
# 格式化
pnpm format

# 代码检查
pnpm lint

# 综合检查（包含拼写检查）
pnpm check
```

### 类型检查

```bash
pnpm compile
```

## 项目结构

```
src/
├── components/         # React 组件
│   └── BtnGroup.tsx   # 银行快捷按钮组
├── entrypoints/       # 扩展入口
│   ├── background.ts  # 后台脚本
│   ├── content.ts     # 内容脚本（自动填充逻辑）
│   └── sidepanel/     # 侧边栏 UI
│       ├── App.tsx    # 主应用组件
│       ├── index.html
│       ├── main.css
│       └── main.tsx
├── hooks/             # React Hooks
├── types/             # TypeScript 类型定义
│   └── useInfo.ts     # 信息类型定义
└── assets/            # 静态资源
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
