


## vite

1. 特点
2. 核心原理
3. hmr
4. 预构建
5. diff with webpack


### vite 特点

为开发提供极速响应的 前端构建工具

1. 快速的冷启动: no bundle + es build 进行预构建
2. 即时的模块热更新: 基于 ESM 的 HMR， 同时利用浏览器缓存策略提升速度
3. 真正的按需加载: 利用浏览器的 ESM 支持， 实现按需加载




### 核心原理


开发阶段: 本质是利用浏览器对 ESM 特性的支持. 启动一个服务器去进行所有内容的拦截，将相应的内容以 esm 格式返回浏览器
build阶段: 预定义的rollup

### HMR
通过 serverPluginHmr plugin 为核心实现 
本质是: 通过 websocket 创建浏览器和服务器的通信监听文件的改变  
- 文件被修改时, 通知客户端修改从新加载相应代码并更新

具体流程:
1. 创建 websocke  服务端和 client 文件, 启动服务
2. 通过 chokidar 监听文件变化
3. 代码变更后,服务端推送信息到客户端
4. 客户端根据推送的消息,对不同的data.type 执行不同的逻辑操作(vue-reload, style-update, full-reload 等)



关于 chokidar
- node fs.watchfile 通过轮巡检测文件变化， 有延迟, 切只能监听一个文件
- fs.watch 通过操作系统提供的文件更改通知机制, 修改一个文件时，可能触发多次写操作，触发多次回调
- 实现:
    - 对文件修改时间比对
    - 校验md5
    - 尝试100ms 延迟， 避开中间状态
    - 对边界条件的处理，对软连接、权限等情况处理



### 预构建

首次启动vite时,会进行预构建, 目的如下:
1. commonjs 和 UMD 兼容性: 在开发阶段，vite开发服务器将所有代码都视为ESM, 因为必须先将模块类型进行转换
2. 性能: 将具有需要内部模块的 ESM 依赖项转换为单个模块， 如 `import { debounce } from 'lodash-es'`

> 依赖预构建仅适用于开发模式，并使用 esbuild 将依赖项转换为 ES 模块。在生产构建中，将使用 @rollup/plugin-commonjs。

tip: vite默认只对 node_module 文件夹下的 .js .cjs进行转换, 其他cjs需要手动声明



### diff with webpack
1. 启动时间快: 
    - webpack 先编译时间长
    - vite 预编译 解析模块依赖 使用esbuild(go 快)
2. hmr:
    - webpack 需要编译， 编译后diff chunk 然后再进行
    - vite nobundle, 通知浏览器去重新加载变化的文件即可



## rollup 

模块打包器

  - scope-hosting
  - 一次输出多种格式
  - 文档精简
  - 不支持一些特定的高级功能， 构建大型应用尤其费时
    - 代码拆分 热更新(plugin)
    - 动态导入(v3支持cjs)

### esbuild

- 无代码分割 css处理

1. 使用go编写
2. 大量并行操作
3. 代码没有依赖第三方库
4. 高效的内存利用 (每个阶段的数据是可以继续使用的, 其他工具不可以)
