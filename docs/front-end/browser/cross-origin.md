

## 起因

浏览器 为了请求安全而引入的基于同源策略的安全特性
```
  可嵌入跨域资源的:
    - 使用 <script src="…"></script> 标签嵌入的 JavaScript 脚本。语法错误信息只能被同源脚本中捕捉到。
    - 使用 <link rel="stylesheet" href="…"> 标签嵌入的 CSS。由于 CSS 的松散的语法规则，CSS 的跨源需要一个设置正确的 Content-Type标头。如果样式表是跨源的，且 MIME 类型不正确，资源不以有效的 CSS 结构开始，浏览器会阻止它的加载。
    - 通过 <img> 展示的图片。
    - 通过 <video> 和 <audio> 播放的多媒体资源。
    - 通过 <object> 和 <embed> 嵌入的插件。
    - 通过 @font-face 引入的字体。一些浏览器允许跨源字体（cross-origin fonts），另一些需要同源字体（same-origin fonts）。
    - 通过 <iframe> 载入的任何资源。站点可以使用 X-Frame-Options 标头来阻止这种形式的跨源交互。
```
##  解决方案

### cors

在响应头中添加 `Access-Control-Allow-*` 头，告知浏览器端通过此请求

分类:
  - 简单请求
  - 需预检请求

#### 简单请求

- 请求方法：GET、HEAD、POST。
- 请求头：Accept、Accept-Language、Content-Language、Content-Type。
- Content-Type 仅支持
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain
- 请求中无 readableStream 对象
- 如果是xhr对象，没有调用upload.addEventListener();



#### 需预检请求

避免跨域请求对服务器数据产生影响 

先自动向服务端发送一个 `OPTIONS` 请求，通过服务端返回的 Access-Control-Allow-* 判定请求是否被允许。

CORS 引入了以下几个以 Access-Control-Allow-* 开头：

- Access-Control-Allow-Origin 表示允许的来源
- Access-Control-Allow-Methods 表示允许的请求方法
- Access-Control-Allow-Headers 表示允许的请求头
- Access-Control-Allow-Credentials 表示允许携带认证信息

#### 关于凭证

对于简单请求, 如果 添加了凭证withCredentials, 但是响应头中无凭证, 则浏览器不会返回给用户 

对于需预检的请求不能包含凭据。预检请求的响应必须指定 Access-Control-Allow-Credentials: true 来表明可以携带凭据进行实际的请求


### 反向代理

服务端做一个转发处理， 将请求从跨域转为同源

### JSONP

JSONP 的原理是利用了浏览器加载 JavaScript 资源文件时不受同源策略的限制而实现的

### 不常用

1. postMessage
  通过 iframe 进行消息监听
2. window.name
3. document.domain


## 扩展

- canvas 加载图片时不能跨域
- localstorage 跨域同源
- sessionStorage 不同tab页不共享，但是A打开B,是会赋值一份A的到B
- Websocket 不受同源策略影响
- webview调用scheme
  - 非标准浏览器发起的http请求，通过应用的特定接口处理 
