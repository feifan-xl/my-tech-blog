
## 性能优化

## debounce & throttle

debounce 防抖:ns内只执行一次, 如果触发重新计算时间
    - 服务端校验
    - 提交按钮 防止多次提交

throttle 节流: ns内只触发一次
    - 拖拽 短时间内只执行一次
    - 缩放 resize
    - 动画 短时间内多次影响性能

*debounce*
```js
function debounce (fn, time) {
    let timer
    return function (...args) {
        let context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(context, ...args)
        }, time)   
    }
}
```

*throttle*
```js
function throttle (fn, time) {
    let timer 
    return function (...args) {
        let context = this
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, time)
    }
}
```

## 多图站点性能优化 

主要策略:
1. 图片优化: 图片压缩/缩放和选择正确的格式
2. 网络传输优化: 使用http2和 CDN 服务
3. 图片加载策略优化: 按需使用 懒加载，预加载，响应式图片加载等策略 


### 图片优化 

1. 合适的图片格式
    - jpeg 有损压缩 但不影响
    - png 透明
    - gif
    - webp
    - svg

2. 图片压缩


### 网络传输优化

1. 减少请求数量
    - sprite
    - base64
    - 多个域名，开启多个TCP链接, 突破浏览器同源最大并发连接数限制
2. http2 支持多路复用
3. 使用CDN


### 图片加载策略优化 


1. 懒加载
    - img 标签的 loading 属性，lazy 在可见后加载， 兼容性ie否
    - intersection Observer API  兼容性
    - scroll resize 等事件
2. 预加载
    - `<link rel="preload" as="image" href="important.png" />`  允许开发者在 HTML 的 head 标签中声明资源请求，指定页面需要预加载的资源，并且在浏览器的主要渲染机制启动之前加载，避免阻塞页面渲染且保证资源尽早可用
    - 动态场景
    ```js
        // 动态创建 Image
        function preloadImage(url) {
        var img = new Image();
        img.src = url;
        }
    ```

3. 响应式图片加载: 根据屏幕分辨率 选择对应大小的图片
    ```html
        <picture>
            <source srcset="hzfe-avatar-desktop.png" media="(min-width: 990px)" />
            <source srcset="hzfe-avatar-tablet.png" media="(min-width: 750px)" />
            <img src="hzfe-avatar.png" alt="hzfe-default-avatar" />
        </picture>
    ```


## 减少白屏时间 

### 性能指标

Navigation Timing API and Lighthouse Performance

Lighthouse Performance:
1. TTFB(time to First Byte) 浏览器接收第一个字节的时间
2. FP(first paint) 首次内容绘制，仅有一个div根节点
3. FCP(first content paint) 首次有内容的绘制，页面基本框架，但没有数据
4. FMP(first meaning paint) 首次有意义的绘制
5. TTI:Time To interactive 可交互时间
6. Long tasks:超过50ms的任务
7. SSR && CSR:服务端渲染和客户端渲染
8. Isomorphic JS:同构化

### 加载慢原因及方案


1. 资源加载问题
    1. 速度慢
        - 优化加载速度
            - rel dns-prefetch
            - preconnect
            - http2
        - 预加载
            - preload
        - http请求数量多
            - 资源合并
                + sprite
                + icon svg等打包进js css
                + 小文件合并
    2. 文件大
        - 压缩
            + html 压缩 html-minifier
            + js 压缩 uglify-js
            + css 压缩 clean-css
            + gzip
            + 图片的优化
                + 图片格式
                    - jpg jpeg png webp base64
                + 图片压缩
        - 懒加载 延迟 异步
        - 分包
    3. 缓存
        - 强缓存
        - 协商缓存
        - service woker
2. 渲染问题
    + DOM 操作的优化
    + 渲染应用
        - lazy load
        - load before
        - debounce throttle
        - debounce 防抖 最后一个人说的算
        - throttle 节流 第一个人说的算
        - 异步线程
        - script 标签 defer async
        - defer 异步下载 domContentLoaded 事件前执行
        - async 异步下载 下载后执行
        - preload  预下载  下载后并不执行 需要时执行
        - prefetch 预判下载  闲时下载
    + ssr


参考: https://alienzhou.github.io/fe-performance-journey/


1. 网络延时问题
2. 资源文件体积是否过大
3. 资源是否重复发送请求
4. 加载脚本时,渲染内容堵塞了





### 主要流程

1. dns 解析优化, 提前获取 IP 地址（仅对跨域源上的请求有效）
   - `<link rel="dns-prefetch" href="" />`
   - 或者 http header Link字段
2. TCP 连接优化
    `<link href="https:" rel="preconnect" />`
3. 请求优化
    - http2 多路复用 首部压缩 二进制分帧 等 
4. 页面解析优化
    - ssr
    - 预渲染 prerender-spa-plugin
5. 资源加载优化和页面渲染优化
    - 减少资源大小
        - gzip 
        - 拆分后动态加载
    - 加快加载速度
        - cnd
        - http2
    - 预加载
        - prefetch 预请求 
        - preload
6. 接口合并 



#### prefetch preload

preload 告诉浏览器立即加载资源;
prefetch 告诉浏览器在空闲时才开始加载资源；
preload、prefetch 仅仅是加载资源，并不会“执行”;
preload、prefetch 均能设置、命中缓存；
正确使用 preload、prefetch 不会导致重复请求；



## 

### 性能

性能是对网站或应用程序的客观度量和用户的体验  
主要包括：
- 减少总体负载时间
- 尽快使网站可用
- 流畅性和可交互性
- 感知性能： 用户所体验到的，是网站看起来有多快，而不是网站实际有多快
- 性能测量 实际速度和感知速度


#### 感知性能
主要有：
- FP
- FCP
- FMP
- LCP  最大内容绘制时间
- TTI  可交互时间