


## base

### 双线程架构

逻辑层和视图层分开， 通过wxjsbriage进行通信

好处:
1. 安全， 沙箱隔离， 无dom bom
  - 不允许跳转
  - 不允许操作dom
  - 不允许随意使用window上未知的api

2. 性能
  - 双线程并行，初始化快
  - 不会阻塞
3. 提供原生渲染能力和原生api能力



为什么快
1. 双线程 不阻塞(同时加载， 渲染层inited后 等待逻辑层数据初始化，然后加载数据初始化渲染完成)
2. 多个webview 页面切换流畅
3. webvie 预加载
4. 安装包缓存


性能问题：
1. 频繁的调用setData()  双线程卡顿 更新不及时
2. 庞大的数据量去调用setData() 传输的数据转为字符串形式传递，在去执行
3. 页面繁多的dom结构 页面更新不及时 卡顿





### runtime


在 iOS、iPadOS 和 Mac OS 上，小程序逻辑层的 JavaScript 代码运行在 JavaScriptCore 中，视图层是由 WKWebView 来渲染的，环境有 iOS 14、iPad OS 14、Mac OS 11.4 等；
在 Android 上，小程序逻辑层的 JavaScript 代码运行在 V8 中，视图层是由基于 Mobile Chromium 内核的微信自研 XWeb 引擎来渲染的；






### wxml

采用 exparser 组件模型 
- 基于shadow dom 模型
- 可在 纯 js 环境运行
- 高效轻量

优势:
管控与安全：web技术可以通过脚本获取修改页面敏感内容或者随意跳转其它页面
能力有限：会限制小程序的表现形式
标签众多：增加理解成本





### vdom

编译后的WXML文件，以js的形式插入到了渲染层的
交给了 WAWebview.js 来渲染成真实DOM

### 通讯系统设计
最上面提到，视图层和逻辑层通讯是通过Native层。
具体的手段就是

ios利用 WKWebView 的提供 messageHandlers 特性
android 是往webview的window对象注入一个原生方法

这两种会统一封装成weixinJSBridge，这和正常h5与客户端通讯手段一致
初始化过程中Native层理论上是微信客户端，分别在视图层和业务逻辑层注入了WeixinJSBridge
