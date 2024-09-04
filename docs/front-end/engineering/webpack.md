


## webpack

是一种模块打包工具,可以将各类型的资源,如图片,css,js等, 转译组合为js格式的bunble文件 

1. 构建流程
2. loader/ plugin
3. splitechunk
4. tree shaking
5. hmr


### 构建流程

1. 初始化阶段
    1. 初始化参数: 从配置文件、配置对象和 Shell 参数中读取并与默认参数进行合并，组合成最终使用的参数
    2. 创建编译对象：用上一步得到的参数创建 Compiler 对象
    3. 初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
2. 构建阶段
    1. 开始编译：执行 Compiler 对象的 run 方法，创建 Compilation 对象
    2. 确认编译入口: 根据 entry 找出所有入口文件 调用 compilition.addEntry 将入口文件转换为 dependence 对象
    3. 编译模块:  根据 entry 对应的 dependenve 创建 module 对象，调用 loader 将模块转译为标准的 js 内容， 调用 js 解释器 将内容 转换为 AST 对象， 冲中找出该模块依赖的模块， 再递归本步骤， 直至所有入口依赖文件都经过了本步骤处理
    4. 完成模块编译: 递归处理所有依赖能达到的模块后， 得到每个模块被编译后的内容 以及 它们之间的 依赖关系图
3. 生成阶段
    1. 输出资源: 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
    2. 写入文件系统: 确定好输出内容后，根据配置的 output 将内容写入文件系统

### compiler compilation

- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等 只是代表了一次新的编译

### loader/plugin

*loader*
转译文件,职责单一, 将源文件经过转化后输出, 输出内容为标准js文本 或 AST对象，并且可以链式调用 
如 sass-loader -> css -> css-loader -> 找出依赖资源 压缩css -> style-loader -> 转化成通过脚本加载的js

*plugin*
插件， 用来增强 weback 功能， 解决 loader 无法实现的功能  
webpack 本质是一个事件流机制，在运行的生命周期中会广播出许多事件， plugin 可以监听这些事件， 在合适的时机通过webpack提供的API改变输出结果 
plugin 调用方式：异步 同步 异步并行串行 熔断方式(循环执行 跳过)

整个编译生命周期钩子:
- entry-option ：初始化 option
- run
- compile： 真正开始的编译，在创建 compilation 对象之前
- compilation ：生成好了 compilation 对象
- make 从 entry 开始递归分析依赖，准备对每个模块进行 build
- after-compile： 编译 build 过程结束
- emit ：在将内存中 assets 内容写到磁盘文件夹之前
- after-emit ：在将内存中 assets 内容写到磁盘文件夹之后
- done： 完成所有的编译过程
- failed： 编译失败的时候

运行时机:
- loader: 打包文件前
- plugin 全周期 

### splitChunk

默认规则
1. entry 分包处理
2. 异步模块加载
  - require.ensure()
  - importy().then()


### tree-shaking


Tree-Shaking 是一种基于 ES Module 规范中 静态代码分析 的 无用代码删除 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化


*webpack中具体实现*
先标记出模块导出值中哪些没有被用过， 使用 Terser 删除执行没有被用到的导出语句:
- 编译阶段, 收集模块导出记录， 并记录到模块依赖关系图 ModuleGrapg 变量中
- 输出阶段， 遍历 ModuleGraph 标记模块导出变量有没有被使用
- 生成产物时， 变量没有被使用则删除对应的导出语句  


### hot module replace HMR

本质是 webpack-dev-server, 添加了对webpack编译的监听， 并维护与浏览器间的websocket
- 当编译文件变化时， 推送更新, 带上构建时的hash
- 比对hash,发起请求获取更改内容, 通过jsonp获取增量更新,使用内存文件系统去替换有修改的内容



本质是开启了 express 应用， 添加了对webpack编译的监听, 添加了和浏览器的websocket长链接  
当文件变化 触发 webpack 进行编译并完成, 会通过 sokcet 消息告诉浏览器准备刷新  会刷新某个模块  
webpack-dev-server 支持热更新  通过 生成文件的hash值来比对需要更新的模块，浏览器进行热替换 


客户端监听到 hash 消息， 会执行 reloadApp 方法进行更新，在 reloadApp 中会判断是否支持热更新
  - 不支持直接 reload() 页面 
  - 支持 
    - 使用 jsonp 方式 获取最新代码
    - 删除过期模块
    - 将新的模块添加到 module 中
    - 通过 __webpack_require_ 执行相关模块代码  




## 优化

1. 构建速度慢
2. 业务复杂度增加 构建后模块多
3. 多个项目间共用资源存在重复打包 基础库代码服用了不高
4. node 单进程 








### 针对webpack的优化 

*提高打包速度*
  1. 优化 loader
    - 优化文件搜索范围 exclude 排除 node_module  include 指定范围
    - babel-loader  将编译过的文件缓存 cacheDirectory，
    
  2. happyPack plugin
    - 将 loader 的同步执行转换为 并行
  
  3. DllPlugin
    将特定的类库提前打包然后引入， 主要用于类库打包 将公共代码抽离成单独文件 
  
  4. 文件路径
    - resolve.alias 映射别名  加快路径查找
    - resolve.extensions  尽量减少后缀查找列表长度
    - 避免层层查找

  5. webpack-uglify-parallel  多核并行压缩
     

### 针对项目的优化(webpack)

*减少打包体积*

1. 代码压缩  
    - uglifyJS  pro默认开启 

2. 按需加载
    - 路由按需加载， 单独分包 chunk
      - require.ensure
      - import()
      - runtime

3. scope hoisting   分析出模块间依赖， 将引用的模块进行提升， 多个相同引用仅打包成一份
    - optimiztion.concatenateModule

4. tree-shaking
    - 多使用 ESM 库，  loadsh-es
    - webpack4 pro

5. 使用 url-loader svg-url-loader 进行图片压缩

6. externals commonChunksPlugin  分离提取三方库
    排除不打包的依赖项， 进行cdn加速缓存

7. 使用 ignore plugin 移除三方库中无用部分 

8. gzip   




*缓存*
1. split-chunks-plugins 大文件进行分包
  - 将运行时代码进行单独打包， 不长修改的三方库进行缓存

2. 文件名输出  使用 contenthash 区分版本  [name].[chunkname].js
  - [hash] 构建相关
  - [chunkhash]  chunk 相关
  - [contenthash] 内容唯一 hash

3. 提取三方库 运行时等  commonChunkPlugin  
    - 使用 contenthash  进行长期缓存 

4. 






1. CommonsChunkPlugin 对多入口公有依赖进行提取  



## webpack 5 
1. module Federation: 允许多个webpack 编译产物间共享模块和依赖
  - 应用间组件互用
  - host 应用和 remote 应用组件的依赖共享 
2.  tree-shaking 优化
  - commonjs 通过对 `require()` 的调用跟踪一些相关的导出变量
  - export default 之前会被认为必使用， 现在会做更优的判断
  - 嵌套的 tree-shaking， 跟踪对导出的嵌套属性的访问
3. 持久化缓存

