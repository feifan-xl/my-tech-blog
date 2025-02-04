


- FE
  - html ✅
    - tag and attribute ✅
  - css ✅
    - base
      - 盒模型: 所有的元素在渲染时都是一个矩形盒子
      - bfc 独立渲染区域 
        - 应用: 清除浮动、外边距重叠、自适应布局
        - 触发: 
          - html float不为node position绝对固定 
          - display: inline-block table-cell flex grid
          - overflow 不为 visible
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
      - 执行上下文 js代码被解析和执行锁在的抽象环境
        - 分类 全局、函数、eval
        - 组成
          - 变量对象
            - 包含函数中的所有变量 声明 形参
            - 代码执行上，声明会被提升
          - 作用域链: 作用域间的嵌套关系，可以进行变量查找
          - this: 
        - es5 代码执行流程
          1. 创建
            - 创建词法环境(标识符变量映射)
              - 环境记录器： 存储变量和函数声明的实际位置(let const)
              - 外部环境的引用: 可以访问其外部词法环境，即父级作用域
              - 绑定this
            - 创建变量环境: 存储 var
          2. 执行 
            - 引擎会再次读取执行上下文，并用变量的实际值更新VO
            - 编译器再把代码编译为计算机可执行的字节码后执行
          3. 回收
      - 作用域 定义了函数和变量的可访问性 
        - 全局 函数 块级 eval
      - 闭包  嵌套函数内的子函数对所在函数内的变量持有引用时
        - 利用了作用域链的特性 和 垃圾回收机制的引用计数规则 通过维持函数作用域的引用，让函数内的变量可以在当前作用域外被访问到
        - 闭包的变量并没有保存在栈中,而是js引擎判断是闭包后,在堆空间中创建一个 closure 对象 来保存  
        - 应用 命名空间 私有变量 延迟生命周期 curry
      - 柯里化 将接收多个参数的函数 转为为接收 一个参数 的函数 
      - 原型
        - 原型链
        - 继承 
          - es5 es6
            - es6
              - super() super.xx();
              - new.target == ?
        - new 执行构造函数，生对应的实例
          - 执行过程 创建空对象 绑定原型 this 返回新对象
      - this 创建执行上下文自动生成的一个对象，指代当前所处的上下文环境
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
    - gc 内存自动管理机制 自动回收分配给程序的已经不再使用的内存
      - 常见的 GC 算法有引用计数法和标记清除法
      - v8
        1. V8 的 GC 系统通过分代式垃圾回收机制，有效处理了不同生命周期的对象  
        2. 新生代采用 Scavenge 算法快速回收  
        3. 而老生代通过 Mark-Sweep 和 Mark-Compact 策略优化内存管理  
        4. 结合并行 增量(间歇小量) 并发(后台)， 减少主线程挂起的时间，确保了 JavaScript 应用程序的高性能和低延迟
    - js-runtime 编译原理 ✅
    - 渲染流程
      - 主要流程
        1. PARSE：解析 HTML，构建 DOM 树。
        2. STYLE：为每个节点计算最终的有效样式。
        3. LAYOUT：为每个节点计算位置和大小等布局信息。
        4. PAINT：绘制不同的盒子，为了避免不必要的重绘，将会分成多个层进行处理。
        5. COMPOSITE & RENDER：将上述不同的层合成为一张位图，发送给 GPU，渲染到屏幕上
      - 渲染性能优化
        - 避免渲染过程中重绘重排(todo 除动画？)
          1. 适当的结构分层
          2. 动画使用c3
          3. 减少dom操作
        - 优化影响渲染的资源 
          - async defer
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
      - 
    - chromium
    - 事件循环 异步操作的处理机制 
      - 浏览器 任务队列的方式 非阻塞的执行 
      - node 任务队列结合轮询的方式
        - timers、i/o callbase、idle prepare
        - poll、check、close
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
      - ssr
        
    - vue
      - 原理 
        - 响应式
          - 数据劫持 结合发布-订阅模式
          - 通过object.defineProperty 将对象的属性转换成getter/setter 的形式来监听他们的变化
          - 当读取属性值的时候会触发getter进行依赖收集
          - 当设置对象属性值时会触发setter,对依赖的订阅者发送通知, 从而进行更新
        - 双向绑定
          - 通过 v-model 实现， 是v-bind:xx v-on:xx 的语法糖
          - 当触发元素对应的事件(input, change等) 时更新数据
          - 当数据更新时同步到元素对应的属性上
      - vnode
        - 通过 js 对象模拟真实dom结构， 以减少直接操作dom的开销
        - 为什么快: 减少了对 dom操作的次数
          - 直接访问dom属性 会导致重绘重排 开销大
          - diff结合批处理 将多次操作合并
        - 
      - diff: 新旧 vdom tree 的比较算法
        - 简单策略
          - 深度优先 同级比较
          - 通过 key 关键字， 更加精确快速的找到相同节点
        - 双端 vue2 
          - 新旧首尾4个节点比对
        - 快速diff vue3 (再看一遍)
          - 先处理新旧节点相同的前置节点和后置节点
          - 然后根据节点对应关系，建立索引表，根据新旧节点顺序构造出最大递增子序列
          - 子序列为不需要移动的点，然后进行索引表遍历，不同点就是要更新的节点 
      - watch computed
        - computed 计算属性，创建一个新的属性，只有当依赖变化时才会改变
        - watch 创建一个监听其他依赖变化的属性， 每当变化 就重新执行
      - vue3
        - 原理
          - 使用proxy 结合reflect 代理数据的访问和修改
          - 依赖收集: 在访问数据时 会收集相应的副作用函数
          - 依赖触发： 在数据修改时，执行已收集的副作用函数， 以到达依赖追踪和自动更新
        - reactive ref
          - reactive 对整个对象的代理
            - 相应丢失: 赋值结构后 丢失了响应式
              - 使用toRef解决
          - ref 本质上是对reactive的封装 包裹对象
            - 如果是引用类型 不变
            - 简单类型， .value 去封装
          - 自动脱 ref: 在template模板上使用ref， 不需要调用.value
            - 编译时，setup函数返回的 ref函数再进行一次 proxy，返回值是 .value
        - watch watchEffect
          - watch 作用是对传入的某个或多个值的变化进行监听
            - 支持 deep 和 immediate
          - watchEffect 自动收集依赖的监听
            - 自动依赖收集、立即执行一次、没有旧值比较
        - script setup 宏: 特殊代码，由编译器处理并转换为对应的功能代码，本质语法糖
          - 编译后返回一个对象
            - setup顶层定义的变量
            - import 导入的内容
        - 3 与2 区别
          - 新特性
            - 更快
              - 响应式系统提升
              - 编译优化 (diff算法优化)
            - 更小
              - 结构重构 基于ESM 支持tree-shaking 
            - 更易于维护
              - composition API
              - ts
              - monorepo
            - 新功能
              - composition API
              - fragment teleport suspense

          - 响应式 系统
            - proxy 重写  
            - 可以监听动态新增的属性
            - 可以监听删除的属性
            - 可以监听数组索引和length
            - 性能提升 对象嵌套属性只代理第一层，运行时递归，用到时才代理
          - 编译优化
            - 静态提升 静态节点会被提升到 render 外
            - slot 编译优化， 非动态 slot 属性的更新 只会触发子组件更新
              - 2.0 中父组件更新 slot会强制update
              - 3.0 优化了 slot 的生成， 使得非动态slot中属性的更新只会触发子组件的更新
            - diff 优化 
              - 添加 patchFlag 标识  渲染时直接复用  不需要diff
              - 快速diff 替换双端diff
              - 2.0 深度优先 同级比较 双端比较
            - 事件缓存
              - 2.0 针对节点绑定的事件 每次触发都要重新生成新的function去更新
              - 3.0 中 提供了事件缓存对象 cacheHandlers 开启后，编译时回自动生成函数事件
          - fragmen
            - vue2 基于snabbdom， 为了提高diff 效率， 每个组件是一个vnode， 只有一个节点
            - vue3 重写vdom， 每个组件对应的vnode数量就不那么重要了
        - 
      - 同构: 应用在服务器和客户端同时渲染的技术
        - 流程
          - 服务端使用vue组件生成html，将预取的数据与html一同返回给客户端
          - 客户端渲染html后 通过js激活页面
            - 建立dom与vnode之间的联系(提取服务端序列化后的数据初始化vuejs)
            - 为页面中的dom元素添加事件绑定 
        - 注意
          - 生命周期不同 无 mounted update mounted 相关对象 
          - bom对象 (window) dom
          - 跨平台api 如 xhr/http 可使用axios
          - 状态污染
            - 模块级别的全局变量，在node中多次执行 
      
      - 生态
        - router
          - 
        - pinia & vuex
    - react and vue
      - 相同
        - 视图层框架，数据驱动视图的思想
        - 以vdom为基础，组件化的方式组织应用
      - 不同
        - 核心理念 
          - 渐进式框架理念，即可提供轻量级视图层框架，也可以通过插件工具扩展玩完整前端框架
          - 专注于组件化开发 和 声明式 渲染
        - 数据流: 都是单向数据流，但是vue提供了双向绑定的语法糖
        - 响应式 自动收集依赖更新数据 / 手动进行数据更新
        - 开发体验上 便捷 / 灵活度高
        - 性能优化 框架本身做了很多优化，  需手动优化 
        - 使用场景: 小型 / 大型   社区、灵活度
    - svelte
    - next & nuxt
  - ts
    - 泛型: 工具，定义时不指定 使用时制定 
    - 三斜线
    - 基础
    <!-- - 待补充 -->
  
  - engineer
    - 模块化 esm、CommonJS、umd、amd 
      - esm 现代浏览器原生支持的模块化规范
        - import exort 语法简单吗
        - 输入的是值的引用
        - 静态加载 支持静态代码分析
        - Node.js 同步加载，浏览器端异步加载
      - commonjs 应用于 node 中的模块规范
        - require exports 值的拷贝
        - 同步加载、模块作用域、缓存机制
      - AMD 异步模块规范，  浏览器端开发 requireJS
        - define([], function () {}) require
        - 异步加载  依赖前置 
        - 手动管理依赖 代码较大 复杂性高 
      - UMD 通用模块定义 跨平台解决方案，解决 commonjs amd 等不兼容
        - 优先级 define -> module.exports -> esm
        - 找不到任何模块系统， 进行回退，挂载到全局对象上 
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
      - 优化
        - vite 本身实现
          1. css 代码分割
            - 将异步 chunk 模块中使用的css抽取并生成单独文件
            - 在 css 加载完毕后 再执行 chunk 避免 fouc
          2. 自动添加 modulepreload 属性 
          3. 异步chunk加载优化
            - 使用 预加载 自动重写代码，用来分割动态导入调用
            - 同时请求异步chunk 然后在顺序加载 
        - 浏览器缓存
        - 明确导入路径，较少自动寻找
        - 避免 export * from 
        - 可预热频繁使用的组件， warmup api
        - 按需引入
          - esm
          - external 部分使用cdn
          - 路由懒加载
    - babel js编译器，将高版本的转译为低版本的
      - ast 抽象语法树 以树的形式来表现编程语言的语法结构
      - 编译流程: 先转换为 AST, 对 AST 应用各种插件进行处理， 最终输出编译后的js代码
        1. 解析 string -> token -> AST
        2. 转译 对 AST 进行 dfs, 调用插件处理相关节点
        3. 生成
      -  plugin preset
    - rollup 模块打包器， 本质上就是对文件合并
      - 特点：
        - 文档精简
        - 一次输出多种格式
        - 不支持代码拆分等特定高级功能
      - 构建优化
        - 合理使用esm treeshaking
        - 缩小打包范围 external 不必要的包
        - cache
        - 多线程？ 未使用过 
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
            1. 客户端发起请求， 包含 syn 标志位1 随机序列号 seq 客户端进入`SYN_SENT`状态
            2. 服务端接收，开启一个socket端口， 返回syn=1 ACK=1 随机序列号 确认号seq+1 进入`SYN_RCVD`等待
            3. 客户端根据 控制位为ack=1, 确认序列号为ack+1, 进入连接状态，服务端接收到后也进入连接状态
          - 四次挥手
            1. 客户端打算关闭时， 发送首部表示位fin=1， 进入`FIN_WAIT`
            2. 接受后， 进入 `CLOSE_WAIT`， 返回报文
            3. 发送完所有文件后， 发送 FIN=1, 进入`LAST_CK`
            4. 客户端接收后发送确认， 2msl后自动关闭， 服务端接收后直接关闭
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
        - 强缓存
          - cache-Control 
            - no-cache 强制发起请求 可协商
            - no-store 不允许一切缓存
            - public/max-age 任何人 private/s-max-age  仅客户端
          - expires max-age 
        - 协商缓存
          - Etag / if-none-match
          - lastModify/if-modify-since
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
        1. 客户端，TLS版本号，支持的密码套件列表 随机数
        2. 确认TLS版本号 选择一个密码套件，生成一个随机数
          - 发送数字证书 
        3. 客户端验证证书 
          - 生成随机数  使用服务端公钥加密 发送服务端
          - 这三个随机数 生成会话秘钥，即为对称秘钥
          - 发送通知 告知后续开始加密
          - 对之前所有的数据做摘要，用会话秘钥加密，发送 Finishd 信号 
        4. 服务器验证 
          - 发送通知 告知后续开始加密
          - 用会话秘钥加密，发送 Finishd 信号 

    - RPC
    - websocket
    - cdn
      - 组成、作用
      - 回源
    - dns
      - 多级缓存
  - 安全 ✅
    - XSS 跨站脚本攻击 在网页中插入恶意的js脚本，用户浏览时会触发脚本
      - 反射 存储 dom
        - 劫持cookie 
        - 利用 iframe xhr等 以用户身份执行操作
      - 防范
        - 输入和输出进行过滤和转译
        - csp 只能执行特定来源的代码
        - cookie httponly 
    - csrf 跨站请求伪造 攻击者盗用用户身份，以用户身份发送恶意请求 如 钓鱼邮件
      - 防范
        - csrf token
        - cookie samesite
        - 设置白名单，仅允许安全域名请求
        - 验证码
    - MITM 中间人攻击 通过拦截解密方法对用户的访问进行攻击
      - 拦截
        - dns 欺骗: 连接不可信wifi
      - 解密
        - ssl 剥离/伪造
      - 防范: 
        - 陌生wifi 浏览器安全提示
        - https 敏感信息不放公网 特殊验证 
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
  - oss: 一种认证机制，允许用户在一个地方登录后，访问多个应用系统时无需再次进行身份验证
  - 监控
    - 性能
    - 错误
    - 日志
  - ssr
    - 原理: 利用服务端渲染组件并生成html的一种技术，主要是用来提高页加载速度和seo优化
    - 流程
      - 服务端
      - 客户端激活
        - 建立dom 与 vdom 之间的联系
        - 给dom 元素添加绑定事件
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
- other
  - gzip huffman + lz77
    - lz77 将源文件中的重复字节 使用 长度、距离 对其进行替换，从而达到压缩的目的 
  - sourcemap 压缩混淆后的代码与源码的映射
    - 一般来说 source map 的应用都是在监控系统中，开发者构建完应用后，通过插件将源代码及 source map 上传至平台中。一旦客户端上报错误后，我们就可以通过该库来还原源代码的报错位置（具体 API 看文档即可），方便开发者快速定位线上问题。


