


- vue
  - 响应式原理
  - reactive / ref
    - torefs
  - watch / watchEffect
  - v2 / v3
    - 快
      - proxy
      - 编译优化
    - 小
      - esm
    - 易维护
      - componsition
      - ts
      - monorepo
  - diff  简单 双端
    - 快速： 先处理前置和后置节点，
  - hoc
    - suspense
    - keepalive
    - teleport
  - 编译原理
  - setup
  - ssr
  - compositon API
  - pinia provide/inject 机制注入到vue组件


- react
  - 特点： 声明式 组件化 视图层 数据驱动
  - 哲学： 单向数据流
  - fiber: 任务调和器，用于提高渲染性能和可扩展的架构
    - 核心思想: 将渲染过程拆分成多个可中断可恢复的任务， 允许react更加灵活的管理更新ui
      - 增量渲染和时间切片
      - 优先级调度
      - 并发模式和异步加载等(concurrent mode & suspence)
    - 主要流程
      - render阶段 构建fiber对象，构建链表，在链表中标记可执行的dom操作
      - commit阶段 根据链表进行dom操作
    - fiber对象: 描述组件树的数据结构，代表了可中断可恢复的渲染任务
    - 优先级
      - 最高 同步任务， 用户交互事件 页面加载过程的同步操作
      - 中等 异步任务 普通更新 网络请求
      - 最低 不紧急  日志 统计 等
  - 生命周期
    - 挂载
      - constructor
      - render
      - componentDidMount
    - update
      - render
      - componentDidMount
    - 卸载
      - componentWillUnmount
  - hooks
    - 状态保存在 组件实例对象上， 也就是fiber节点上
    - 副作用管理 组件中触发 react 功能的钩子函数 
    - 原理: 函数闭包来保存状态，通过数组结构导出值来使用，并将值绑定到该组件对应的fiber节点上 
  - 版本
    - v18
      - 并发支持 concurrent API： vnode更新一部分 渲染一部分 -> 流式服务端渲染
      - 自动批处理: 处理原生事件不会进行批处理问题
  - next


- vue and react
  - 相同 
    - 视图层 数据驱动
    - vdom 组件化
  - 不同
    - 核心理念
      - 渐进式 
      - 专注组件 声明式渲染
    - 数据流
    - 响应式
    - 开发体验
    - 性能优化
    - 使用场景
- san
  - 小 10+k 
  - 快 响应式 订阅发布模式 初始化时收集依赖 数据变化时手动触发事件 

- svelet 编译型框架
  - 不依赖虚拟 DOM，而是在编译阶段将组件转换为高效的原生 JavaScript 操作

- solid
  - 不 vdom， 但 响应式系统是基于细粒度响应