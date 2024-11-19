



## micro fe

微前端是一种*前端应用模块化*的架构思想
通过将项目拆分成多个小型自治的应用，来降低复杂度、增加扩展性



*主要特点、核心价值*
  1. 独立性: 独立开发部署
  2. 技术栈无关
  3. 应用隔离： 子应用的独立性 样式状态独立

*核心能力*
1. loader 加载 依赖管理，公用依赖
2. router路由管理
3. sandbox隔离机制
  - js
  - css
4. 通信机制


*主流解决*
  1. single-spa
    - 路由分发能力强，根据路径动态加载不同的子应用
    - 需要工程化支持，学习成本高
  2. qiankun
    - 通过监听路由，结合 single-spa 管理子应用调度，import-html-entry实现加载卸载
    - 通过构建子应用容器 数据劫持等方式实现 js沙箱 
    - 基于single-spa import-html-entry实现的， 
      - single-spa 子应用的调度, ihe 子应用的加载
      - 本身实现的sandbox
        - proxy 对 window 进行拦截
        - 快照模式， 浅拷贝做镜像， 然后卸载后 使用镜像还原
      - css 隔离
    - 
  3. web component
    - micro app
  4. iframe
    - 问题 
      - 全局上下问 完全的隔离
      - ui 同步 全局弹窗等
      - 性能加载 
  5. webpack5 Module Federation
    - 自由度高
    - 需要自定义实现css隔离、js沙箱、路由劫持等功能


