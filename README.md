# tdsheepvillage-view

## 这是什么？

听说过保卫羊村吗？童年游戏的怀旧版：<https://www.tdsheepvillage.com/>

本项目是为该游戏制作的数据小工具，方便玩家查询相关信息。

## 使用了什么技术？

这也是我的一个 Vue 纯前端练习项目，跟进使用了最新的前端开发工具：TypeScript + Vite5 + Vue3.4 + ElementPlus2.5。

使用的功能包括：

- GitHub Actions 自动部署到 Pages。含对部署后刷新路由跳转 404 的处理。
- Prettier (+ sort-imports) + ESLint TypeScript。基于 husky 和 lint-staged 钩子实现提交时自动格式化。
- Markdown 页面（使用 katex 支持 LaTeX 公式）。
- Vue i18n。
- Vue JSX。
- tailwindcss。
- Vue ECharts。
- vue-clipboard3 支持设置剪贴板内容。
- vue-json-pretty 展示 JSON 文本。
- 自行实现的简单命令式对话框（`DialogImport`，`DialogExport`）。
- Vite 打包 gzip 压缩（`vite-plugin-compression`）和循环导入检测（`vite-plugin-circular-dependency`）。

此外，代码中也有大量 Vue 响应式编程的实践，处理用户交互对系统参数的影响。
