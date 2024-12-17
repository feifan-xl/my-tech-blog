

## 跨端技术
  - 原生渲染
    - rn  
      - js 引擎计算 远程渲染引擎绘制
      - 架构
        - react 层: 利用react框架进行ui数据描述，转换为vdom
        - js bundle： 将rn打包成bundle
        - bridge: 连接react与navite
        - native
          - module 与上层交互的原生能力接口
          - ui 终端实际的控件展示
          - layout  Flexbox 布局系统的 JS 和 Native 的镜像映射关系
      - 问题
        - na 与 js通信带来的性能瓶颈 
          - 滚动
          - 动画
  - 自渲染引擎
    - flutter 底层渲染ui
    - 架构
      - dart ui
      - framework 内置组件
      - engine  dart虚拟机 kia 跨平台渲染引擎 
        - 建立起 Dart App 层和原生平台之间联系，从而实现二者的双向通信
  - WebView
    - jsbridge
      - 注入API
      - scheme
      - 重写prompt
    - 性能优化
      - 预热
      - 缓存
      - 劫持: 劫持网络请求， scheme
      - 替换: 替换 web img video等标签
  - 小程序
    - WebView 作为渲染引擎、JSBridge 的封装和离线包机制
  - uniapp
  - taro
    - 编译步骤
      1. 代码解析： taro -> ast
      2. 语法树转换: ast -> 对应平台ast
      3. 代码生成: ast -> code
    - 缺陷
      - source-map
      - jsx 支持度不足
      - 


- WebView 预加载
  - 通过平台配置需要加载的内容 优先级等 
  - 