


- FE
  - html ✅
    - tag and attribute ✅
  - css ✅
    - base
      - bfc ✅
      - 三栏布局 ✅
    - 工程化 ✅
      - preprocess ✅
      - css in js ✅
    - 项目 ✅
      - responsive ✅
      - tailwind ✅
  - js ✅
    - base ✅
      - 数据类型 ✅
      - 执行上下文 ✅
        - 作用域 ✅
        - 闭包 ✅
        - 柯里化 ✅
      - 原型 ✅
        - 原型链 ✅
        - 继承 ✅
        - new ✅
      - this ✅
      - 异步 ✅
      - code ✅
        - polyfill ✅
        - scence ✅
    - es6
      - async✅
      - class✅
      - function & arrow function✅
      - let & const ✅
      - promise✅
      - proxt and reflect ✅
      - set & map ✅
      - iterator & generator ✅
      - esm✅
      - widget ✔️
      - object ✔️
  - browser
    - gc ✅
    - js-runtime 编译原理 ✅
    - 渲染流程
      - 重绘、重排
        - 浏览器渲染中的两个重要阶段， 解析-排列/重排-绘制/重绘-合成
        - 重排: 布局结构、节点内容发生变化
          - 盒子尺寸类型
          - 定位 (正常流，浮动和决定定位)
          - 文档树中元素之间的关系变化
          - 外部信息(视口大小)
          - 获取布局信息 offsetTop
        - 重绘: 外观变化 color opcatity
        - 解决
          - dom 批量写入和读取 或者vnode documentfragment
          - css 
            - 动画效果使用c3，将渲染层提升为合成层，开启 GPU 加速，提高页面性能
            - 避免使用复杂选择器
            - 限制重排范围 需要多次重排的元素 positon 为absolute fixed， 脱离文档流，就不回影响其他元素
          
    - chromium
    - 事件循环 ✅
    - cross-origin
      - 浏览器为了请求安全而引入的基于同源策略的安全特性
      - 只有同源的请求资源 才允许js完整访问其内容
      - 常见处理
        - cors
          - 简单请求 
            - method get,head,post 
            - 简单header 
            - 无 stream  xhr没调用upload
          - 需预检请求
        - 反向代理
        - jsonp
        - other postmessge
    - iframe
    - web component
    - webAssembly
    - webrtc 
  - framework
    - react
      - fiber 架构
      - hooks
      - 生命周期
      - ssr ？
    - vue
      - vnode
      - diff
      - 响应式
      - 编译相关
      - V_3.0+
      - setup
      - 同构
      - 生态
        - router
        - pinia & vuex
    - svelte
    - next & nuxt
  - ts
    - 三斜线
    - 基础
    <!-- - 待补充 -->
  
  - engineer
    - 模块化 ✅
      - esm、amd、umd、amd ✅
    - webpack
      - 是一种模块打包工具,可以将各类型的资源,如图片,css,js等, 转译组合为js格式的bunble文件 
      - 构建流程
        1. 初始化阶段
          - 初始化参数： 配置文件 默认参数等合并
          - 创建编译对象： 创建 Compiler 对象
          - 初始化编译环境: 注入内置插件、各种模块工厂 加载配置插件
        2. 构建
          - 开始编译： complier.run() -> compilation对象
          - 确认编译入口: 读取entry配置，遍历所有入口文件，
          - 编译模块（make）: 从入口文件开始递归解析每个模块及其依赖，先调用 loader 对模块进行转译处理，然后调用 JS 解释器（acorn）将内容转化为 AST 对象
          - 完成模块编译：在上一步处理好所有模块后，得到模块编译产物和依赖关系图。
        3. 生成阶段
          - 输出资源: 根据入口和模块之间的依赖关系，组装成多个包含多个模块的 Chunk，再把每个 Chunk 转换成一个 Asset 加入到输出列表，这步是可以修改输出内容的最后机会。
          - 写入文件系统: 确定好输出内容后，根据配置的 output 将内容写入文件系统。
        - compiler compilation
          - Compiler webpack的实例化，全局唯一，包含了 Webpack 环境所有的的配置信息
          - compilation 当前的模块资源、编译生成资源、变化的文件等 只是代表了一次新的编译
      - loader / plugin
        - loader 转译文件,职责单一, 将源文件经过转化后输出, 输出内容为标准js文本 或 AST对象，并且可以链式调用
          - 类型 pre normal inline post
          - 执行顺序:
            - 同等类型下的 Loader 执行顺序才是由右向左，或者由下到上执行
            - 1. pitching post-> inline ->
            - 2. normal pre -> normal ->
          - 熔断机制: 如果pitch 阶段有返回值，那么直接结束pitch阶段，并调到该loader的前一个loader 的normal阶段继续执行
        - plugin 用来增强 weback 功能， 解决 loader 无法实现的功能
          - webpack 本质是一个事件流机制，在运行的生命周期中会广播出许多事件， plugin 可以监听这些事件， 在合适的时机通过webpack提供的API改变输出结果 
          - 调用方式: 异步 同步 异步并行串行 熔断方式(循环执行 跳过)
      - splite chunk
        - 将代码分割成不同的文件块，以实现更好的资源缓存、加载速度优化以及减少初始加载体积
        - 对模块的依赖图进行分析，通过特定的条件和配置（例如大小、引用次数、缓存组等），将符合条件的模块进行提取和分割，生成新的代码块（chunk）
      - Tree shaking
        - 是一种基于 ES Module 规范中 静态代码分析(作用域分析) 的 无用代码删除 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化
        - 实现 先标记出模块导出值中哪些没有被用过， 使用 Terser 删除执行没有被用到的导出语句:
          - 编译阶段, 收集模块导出记录， 并记录到模块依赖关系图 ModuleGrapg 变量中
          - 输出阶段， 遍历 ModuleGraph 标记模块导出变量有没有被使用
          - 生成产物时， 变量没有被使用则删除对应的导出语句  
        - commonjs 通过对require()方法的调用 跟踪引用的导出名称
      - dynamic import 
        - 将模块编译为字符串通过chunkId 结合jsonp方式获取，
        - 通过 promise.all 来接收callback的执行， 并将信息挂载到 runtime 的缓存对象下 
        - 处理方式
          - lazy 默认 多个chunk
          - eager 通过魔法注释来指定
        - 局限 不支持网络资源
      - hmr
        - 本质是 webpack-dev-server, 添加了对webpack编译的监听， 并维护与浏览器间的websocket
          - 当编译文件变化时， 推送更新, 带上构建时的hash
          - 客户端的运行时，比对hash,发起请求获取更改内容, 通过jsonp获取增量更新,使用内存文件系统去替换有修改的内容
        - 对于js css 分别有不同处理方式， 由各自的loader进行处理 
      - 优化
        - 构建速度
          1. 优化loader
            - 优化文件搜索范围 exclude排除node_module
            - 开启缓存 如bable-loader 
            - 并行执行loader  thread-loader
          2. dllplugin 将特定的类库提前打包然后引入， 主要用于类库打包 将公共代码抽离成单独文件 
          3. 文件路径优化
            - resolve.alias 映射别名  加快路径查找
            - resolve.extensions  尽量减少后缀查找列表长度
            - 避免层层查找
          4.  webpack-uglify-parallel  多核并行压缩
          5. 移除 externals:
          6. 启用缓存 v5 (通过模块活chunk的数据hash值作为标识)
        - 产物大小
          1. 代码压缩  uglifyJS  pro默认开启 
          2. 按需加载 dynamic import/ require.ensure
          3. scope hoisting 合并公用模块，避免重复引用打包
          4. 开启 tree-shaking  多使用 ESM 库如loadsh-es
          5. 使用 url-loader svg-url-loader 进行图片压缩
          6. externals 分离提取三方库 
          7. 使用 ignore plugin 指定 移除三方库中无用部分 
          8. 使用CommonsChunkPlugin 对多入口公有依赖进行提取 
          9. gzip
      - V_5.0
        1. module Federation: 允许多个webpack 编译产物间共享模块和依赖
          - 应用间组件互用
          - host 应用和 remote 应用组件的依赖共享 
          - 无需中心应用 expose到处 remote引入
        2.  tree-shaking 优化
          - commonjs 通过对 `require()` 的调用跟踪一些相关的导出变量
          - export default 之前会被认为必使用， 现在会做更优的判断
          - 嵌套的 tree-shaking， 跟踪对导出的嵌套属性的访问
        3. 持久化缓存: 确定的 chunk 模块id 导出名称 
    - vite 为开发提供极速响应的现代前端构建工具
      - 特点
        - 快速启动 no bundle + es build 进行预构建
        - 即时热更新 基于 ESM 的 HMR， 同时利用浏览器缓存策略提升速度
        - 按需加载 利用浏览器的 ESM 支持， 实现按需加载
      - 工作原理
        - 开发阶段: 本质是利用浏览器对 ESM 特性的支持. 启动一个服务器去进行所有内容的拦截，将相应的内容以 esm 格式返回浏览器
        - build阶段: 预定义的rollup
      - 启动流程
        1. 配置参数解析
        2.  创建 HTTP 和 WebSocket server，用于启动开发 server 和热更新通信
        3. 启动 chokidar 文件监听器，监听文件变化，实现热更新
        4. 创建 ModuleGraph 实例 记录模块依赖关系
        5. 预构建
        6. 启动服务
      - hmr
        - 通过 websocket 创建浏览器和服务器的通信监听文件的改变  
        - 文件被修改时, 通知客户端修改从新加载相应代码并更新
        - 具体流程:
          1. 创建 websocke  服务端和 client 文件, 启动服务
          2. 通过 chokidar 监听文件变化
          3. 代码变更后,服务端推送信息到客户端告 知此次文件修改的类型
          4. 客户端根据推送的消息,对不同的data.type 执行不同的逻辑操作(vue-reload, style-update, full-reload 等)
      - 预构建 首次启动vite时,会进行预构建, 目的如下:
        1. commonjs 和 UMD 兼容性: 在开发阶段，vite开发服务器将所有代码都视为ESM, 因为必须先将模块类型进行转换
        2. 性能: 将具有需要内部模块的 ESM 依赖项转换为单个模块， 如 `import { debounce } from 'lodash-es'`
      - esbuild 
        - 使用go编写 充分利用多线程打包 直接编译成机器码
        - 大量并行操作
        - 代码没有依赖第三方库
        - 基于token操作和符号解析，不能操作 AST
      - 优化 todo
        
        1. css 代码分割
          - 将异步 chunk 模块中使用的css抽取并生成单独文件
          - 在 css 加载完毕后 再执行 chunk 避免 fouc
        2. 自动添加 modulepreload 属性 
        3. 异步chunk加载优化
          - 使用 预加载 自动重写代码，用来分割动态导入调用
          - 同时请求异步chunk 然后在顺序加载 
    - babel ✅
      - ast
    - rollup ✅
    - 
- cross platform
  - h5 & JSBridge ✅
  - mini program ✅
  <!-- - flutter  -->
- CS
  - 基础 ✅
    - 线程、进程 ✅
  - 网络✅
    - base
      - 五层模型✅
    - tcp & udp
      - tcp
        - 可靠性
          - 三次握手
          - 四次挥手
          - 数据包序列号 & 确认应答机制
          - 重传机制
          - 流量控制
          - 拥塞机制
        - 缺陷
      - udp
        <!-- - todo -->
      - 区别
    - http
      - base
        - status code
        - header
        - method
        - cookie
      - cache
      - diff version
        - v_1.1
          - 持久连接
          - 管道化传输
          - 分块编码传输
          - 新增host字段
          - 引入协商缓存机制
        - v_2
          - 多路复用
          - 头部压缩
          - 二进制格式
          - 数据流传输
          - 服务端推送
        - v_3
          <!-- - todo -->
    - https
      - diff with http
      - 证书颁发
      - 证书验证
      - TLS 握手
    - RPC
    - websocket
    - cdn
      - 组成、作用
      - 回源
    - dns
      - 多级缓存
  - 安全 ✅
    - XSS 跨站脚本攻击
    - csrf 跨站请求伪造
    - MITM 中间人攻击
    - other
      - SQL 注入
      - 点击劫持
      - DOS 攻击
        - SYN攻击
      - http 网络劫持
      - CDN 劫持
      - SSL 剥离
  - 设计模式
    - 设计原则 SOLID
    - 创建型
      - 工厂
      - 单例
    - 行为性
      - 订阅发版
      - 装饰器
      - 适配器
- topic
  - 性能优化
    - 
  - 渲染流程
- project
  - package manage
    - monorepo & multirepo
    - lerna
    - workspace
    - pnpm
  - oss
  - 监控
    - 性能
    - 错误
    - 日志
  - ssr
  - webrtc
  - lowcode
  - micro fe
    - qiankun
      - sandbox
      - css 
    - single-sap
    - imprt-html-entry
    - iframe
    - webpack5 module federation
    <!-- - 多方案 -->
  - 
- 


