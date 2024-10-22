

## async operation
> 可见 /front-end/browser/event-loop

*常见的异步操作*
1. promise
2. async await
3. genrator
4. MutationObserver
5. setTimeout setInterval setImmediate
6. process.nextTick(Node)
7. Object.observe (已废弃)
8. script attribute: async/defer
9. web worker
10. MessageChannel
11. posetMessage
12. queueMicrotask






### MutationObserver

`MutationObserver` 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分

```config = { attributes: true, childList: true, subtree: true }```

### script tag

- type：
  - 空 默认 普通js
  - module 视为js模块， 代码内容延后处理(defer不生效)
- defer: 立即下载，延迟执行  `DOMContentLoaded` 事件前执行
- async: 异步并行请求，并尽快解析和执行 并不保证按照先后顺序执行 


### web worker


指的是一种可由脚本创建的后台任务，任务执行中可以向其创建者收发信息  

Web Worker 为 JavaScript 创造了多线程环境，允许主线程创建 Worker 线程，将一些任务分配给 Worker 线程运行，处理完后可以通过 postMessage 将结果传递给主线程。优点在于可以在一个单独的线程中执行费时的处理任务，从而允许主线程中的任务（通常是 UI）运行不被阻塞/放慢。

使用 Web Worker 时有以下三点需要注意的地方：
1. 在 Worker 内部无法访问主线程的任何资源，包括全局变量，页面的 DOM 或者其他资源，因为这是一个完全独立的线程。  
2. Worker 和主线程间的数据传递通过消息机制进行。使用 postMessage 方法发送消息；使用 onmessage 事件处理函数来响应消息。 
3. Worker 可以创建新的 Worker，新的 Worker 和父页面同源。Worker 在使用 XMLHttpRequest 进行网络 I/O 时，XMLHttpRequest 的 responseXML 和 channel 属性会返回 null。  

*主要应用场景：*
- 处理密集型数学计算
- 大数据集排序
- 数据处理（压缩，音频分析，图像处理等）
- 高流量网络通信



### MessageChannel

Channel Messaging API 的 `MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个 `MessagePort` 属性发送数据。

*示例: iframe传值*
```js
  var channel = new MessageChannel();
  var para = document.querySelector("p");

  var ifr = document.querySelector("iframe");
  var otherWindow = ifr.contentWindow;

  ifr.addEventListener("load", iframeLoaded, false);

  function iframeLoaded() {
    otherWindow.postMessage("Hello from the main page!", "*", [channel.port2]);
  }

  channel.port1.onmessage = handleMessage;
  function handleMessage(e) {
    para.innerHTML = e.data;
  }
```

### postMessage

一个窗口可以获得对另一个窗口的引用（比如 targetWindow = window.opener），然后在窗口上调用 `targetWindow.postMessage() `方法分发一个 MessageEvent 消息