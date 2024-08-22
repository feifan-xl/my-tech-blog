---
sidebarDepth: 2
---

## why

浏览器 为了请求安全而引入的基于同源策略的安全特性


##  解决方案

### cors

在响应头中添加 `Access-Control-Allow-*` 头，告知浏览器端通过此请求

分类:
  - 简单请求
  - 需预检请求

#### 简单请求

- 请求方法：GET、HEAD、POST。
- 请求头：Accept、Accept-Language、Content-Language、Content-Type。
    Content-Type 仅支持：application/x-www-form-urlencoded、multipart/form-data、text/plain。

#### 需预检请求

先自动向服务端发送一个 `OPTIONS` 请求，通过服务端返回的 Access-Control-Allow-* 判定请求是否被允许。

CORS 引入了以下几个以 Access-Control-Allow-* 开头：

- Access-Control-Allow-Origin 表示允许的来源
- Access-Control-Allow-Methods 表示允许的请求方法
- Access-Control-Allow-Headers 表示允许的请求头
- Access-Control-Allow-Credentials 表示允许携带认证信息

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

1. canvas 加载图片时不能跨域
2. localstrosage/sessionStorage 跨域
