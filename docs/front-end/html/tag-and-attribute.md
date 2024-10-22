

# Tag and some Attribute


## script

- *async* 并行请求，并尽快解析和执行 
- *defer* 并行请求，在 DOMContentLoaded 事件前执行
- *crossorigin* 用来定义元素如何处理跨域请求(img,audio,link,script,video )
  - anonymous 跨域时 不会发送cookie 客户端ssl证书等 用户凭据
  - use-credentials 总是包含用户凭据
  - 其他属性 默认为 anonymous
- *integrity*
  - 验证所获取到资源的完整性的内联元数据
- *referrerpolicy* 获取脚本时 发送哪个referer
  - no-referer
  - origin
  - strict-origin
- *type*
  - module 被视为js模块，会被延后处理.  charset 和 defer 属性不生效 
  - importmap
  - other

## link

- rel 表示连接方式与文档之间的关系
  - stylesheet 样式表
  - icon 
  - preload 预加载 立即加载
  - prefetch 预先获取并缓存资源 空闲时开始
  - dns-prefetch 预先获取dns
  - prerender 废弃
  - preconnect 预先建立连接
- title
- as 资源类型 
  - style
  - script
  - font
  - image
  - ...

  ```html
    <link rel="preload" href="style.css" as="style" />
    <link rel="preload" href="main.js" as="script" />

## meta

- name 文档级别用于全局的，通常与seo、视口等相关
  - description
  - keywords
  - author
  - robots
  - refresh
  - viewport
- charset 字符集声明，告知文档编码类型
- http-equiv 编译指示指令 提供的信息与特定的http header相同
  - content-security-policy 允许页面作者定义当前页面的内容策略
  - refresh
  - content-type 声明 MIME 类型和文档的字符编码
  - default-style 设置默认 CSS 样式表组的名称。


## notes

*SRI*子资源完整性
- `script` 和 `link` 标签 可使用 `integrity` 属性, 告诉浏览器所获取的资源（或文件）的 base64 编码的加密哈希值。
- `integrity` 属性由 `加密算法-base64编码的加密哈希值` 构成(hash可多个)
  - 如 `sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx`
  - > https://developer.mozilla.org/zh-CN/docs/Learn


  