# 天气小宠 · 3D 虚拟宠物

一个可爱的 3D 虚拟宠物应用，集成天气信息、交互系统和 PWA 功能。

## ✨ 功能特性

- **3D 虚拟宠物** - 基于 Three.js 的阳光帅气男生形象
- **天气系统** - 根据时间动态调整天气，配套情话库
- **交互系统** - 支持点击、摇晃手机、充电检测
- **好感度系统** - 通过互动增加亲密度，过期时间自动下降
- **夜间模式** - 晚上自动调暗背景
- **PWA 支持** - Service Worker 离线缓存、离线通知
- **响应式设计** - 完美适配各种屏幕尺寸

## 🛠️ 项目结构

```
app/
├── index.html              # 主入口文件
├── manifest.json           # PWA 配置文件
├── service-worker.js       # 离线缓存和推送通知
├── icons/                  # 应用图标目录
│   ├── icon.svg
│   ├── icon-192.png
│   └── 512.png
├── js/
│   ├── config.js           # 全局配置
│   ├── pet-state.js        # 宠物状态管理
│   ├── messages.js         # 消息库（情话数据）
│   ├── scene-setup.js      # Three.js 场景初始化
│   ├── character.js        # 3D 角色构建
│   ├── animation.js        # 动画逻辑
│   ├── ui.js               # UI 更新逻辑
│   ├── interactions.js     # 交互事件处理
│   └── app.js              # 应用主入口
├── css/
│   └── styles.css          # 样式文件
└── README.md               # 项目文档
```

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/rongdapang/app.git
cd app

# 2. 本地启动（需要 HTTP 服务器）
python -m http.server 8000
# 或使用 Node.js
npx http-server

# 3. 打开浏览器
http://localhost:8000
```

### 部署到 GitHub Pages

1. 确保 GitHub 仓库设置已启用 Pages
2. 选择 `main` 分支作为源
3. 项目自动部署到 `https://rongdapang.github.io/app`

## 📱 PWA 安装

### iOS
1. 在 Safari 中打开应用
2. 点击分享图标 → 添加到主屏幕

### Android
1. 在 Chrome 中打开应用
2. 点击菜单 → 安装应用

## 🎮 交互指南

| 交互方式 | 效果 | 好感度变化 |
|---------|------|----------|
| 🖱️ 点击宠物 | 宠物跳跃，显示随机情话 | +1 |
| 📱 摇晃手机 | 宠物摇晃，显示互动语句 | +3 |
| 🔌 连接充电器 | 宠物充能，提升亲密度 | +2 |
| ⏰ 每小时不互动 | 好感度下降 | -5 |

## 🧡 系统设计

### 好感度系统
- **初始值**: 60
- **最大值**: 100
- **最小值**: 0
- **好感度阈值**:
  - 60-69: 温柔守护
  - 70-79: 深情专一
  - 80-89: 浪漫直球
  - 90-99: 暖心可靠
  - 100: 余生承诺

### 消息系统
- **基础情话**: 根据好感度等级展示
- **天气情话**: 每 5 条消息插入一条
- **互动情话**: 根据交互类型展示
- **总库存**: 100+ 条精选文案

## 🌙 特殊功能

### 夜间模式
- 晚间 19:00 - 次日 06:00 自动启用
- 背景变暗，营造睡眠氛围

### 离线支持
- Service Worker 缓存核心资源
- 离线状态下可正常使用
- 自动清理过期缓存

## 🔧 技术栈

- **3D 引擎**: Three.js 0.160.0
- **图标库**: Font Awesome 6.0.0
- **离线能力**: Service Workers
- **存储**: LocalStorage
- **API**: 设备加速度、电池状态

## 🐛 已知限制

1. 天气信息基于设备时间（本地）
2. 某些旧设备不支持 Battery API
3. iOS 限制了某些交互权限
4. 离线模式下无法接收推送通知

## 📝 代码规范

- ES6+ 模块化开发
- 采用函数式编程范式
- 详细的中文注释
- 配置集中管理

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

## 💬 反馈

如有问题或建议，欢迎提交 Issue 或 Discussion！

---

**Made with ❤️ for 姐姐 by rongdapang**
