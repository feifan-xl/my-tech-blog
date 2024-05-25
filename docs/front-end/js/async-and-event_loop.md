---
sidebarDepth: 2
---

## process and thread

### difference

1. 根本区别: 
  - 进程是操作系统资源分配的基本单位
  - 线程是处理器任务调度和执行的基本单位
2. 资源开销
  - 进程有独立的代码和数据空间，程序间切换开销大
  - 线程是轻量级进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器（PC），线程之间切换的开销小
3. 包含关系 一个进程可以包含多个先线程
4. 内存分配 同一进程的线程共享本进程的地址空间和资源， 进程间的地址空间和资源相互独立 
5. 相互影响 一个进程崩溃后，在保护模式下不会对其他进程产生影响，但是一个线程崩溃整个进程都死掉。所以多进程要比多线程健壮

`小结`
- 进程: cpu资源分配最小单位 (能拥有资源和独立运行的最小单位)
- 线程: cpu 调度的最小单位 (是建立在进程基础上的一次程序运行单位，一个进程可以有多个线程)


### about browser
`js engine` 单线程架构  
`browser` 多线程架构

chrome架构(简略):
  - GUI线程
    + 负责渲染浏览器界面
    + 当界面需要重绘
    + 与JS线程互斥
  - JS引擎线程
    + 通过js
    + 与 GUI 进程互斥
  - 事件触发线程
    + 控制事件循环
    + 如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件线程中
  - 定时器触发线程
    + setTimeout 计数
    + setInterval 计数
  - 异步http请求线程
    + XMLHttpRequest


## event loop

### browser

`micro 微任务` 一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前  
常见的有:
  - Promise.then
  - MutaionObserver
  - Object.observe（已废弃；Proxy 对象替代）
  - process.nextTick（Node.js）
  - async/await

`macro 宏任务` 时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合  
常见的有:
  - script (可以理解为外层同步代码) 
  - setTimeout/setInterval 
  - UI rendering/UI事件 
  - postMessage、MessageChannel 
  - setImmediate、I/O（Node.js）

流程:
1. js引擎将所有代码放入执行栈，并依次弹出并执行，这些任务有的是同步有的是异步(宏任务或微任务)
2. 如果在执行栈中代码时发现宏任务则交给浏览器相应的线程去处理，浏览器线程在正确的时机(比如定时器最短延迟时间)将宏任务的消息(或称之为回调函数)推入宏任务队列。
3. 微任务同理
4. 当执行栈为空时，eventLoop转到微任务队列处，依次弹出每个任务放入执行栈并执行，如果在执行的过程中又有微任务产生则推入队列末尾，这样循环直到微任务队列为空。
5. 当执行栈和微任务队列都为空时，eventLoop转到宏任务队列，并取出队首的任务放入执行栈执行。需要注意的是宏任务每次循环只执行一个。
6. 重复1-5 直到栈和队列都为空时，代码执行结束


### node

NodeJS中执行宏队列的回调任务有6个阶段，按如下方式依次执行：

1. timers阶段：这个阶段执行setTimeout和setInterval预定的callback
2. I/O callback阶段：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
3. idle, prepare阶段：仅node内部使用
4. poll阶段：获取新的I/O事件，适当的条件下node将阻塞在这里
5. check阶段：执行setImmediate()设定的callbacks
6. close callbacks阶段：执行socket.on('close', ....)这些callbacks

其中宏队列有4个，各种类型的任务主要集中在以下四个队列之中：
- Timers Queue
- IO Callbacks Queue
- Check Queue
- Close Callbacks Queue
微队列主要有2个，不同的微任务放在不同的微队列中：
- Next Tick Queue：是放置process.nextTick(callback)的回调任务的
- Other Micro Queue：放置其他microtask，比如Promise等

流程:
1. 执行全局Script的同步代码
2. 执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3. 执行macrotask宏任务，也就是6个阶段, 每个阶段都会
  - 清空 nextTicket queue
  - 清空 microtask queue
4. 重复 2-3

小结:
  - timers queue
  - 清空 nextTicket queue / microtask queue
  - I/O queue
  - 清空
  - check queue
  - 清空
  - close callback 
  - 清空
  - ...

  ```javascript
    console.log(0);

    setTimeout(() => {          // callback1
      console.log(1);
      setTimeout(() => {        // callback2
        console.log(2);
      }, 0);
      setImmediate(() => {      // callback3
        console.log(3);
      })
      process.nextTick(() => {  // callback4
        console.log(4);  
      })
    }, 0);

    setImmediate(() => {        // callback5
      console.log(5);
      process.nextTick(() => {  // callback6
        console.log(6);  
      })
    })

    setTimeout(() => {          // callback7              
      console.log(7);
      process.nextTick(() => {  // callback8
        console.log(8);   
      })
    }, 0);

    process.nextTick(() => {    // callback9
      console.log(9);  
    })

    console.log(10);
  ```
  答案：0, 10, 9, 1, 4, 7, 8, 5, 6, 3, 2 

注意:
1. `Process.nextTick()`虽然是异步API, 但是技术上, 不是事件循环的一部分  
2. setTimeout(0) 与 setImmediate 随机

### summary
1. 事件循环是 浏览器 和 Node 执行JS代码的核心机制，但浏览器 和 NodeJS事件循环的实现机制有些不同

2. 浏览器事件循环有一个宏队列，一个微队列，且微队列在一次循环中队列中的任务一个接一个执行一直到队列为空，而宏队列只取队首的一个任务放入执行栈执行，执行过后接着执行微队列，并构成循环

3. NodeJS事件循环有四个宏队列，两个微队列，微队列执行方式和浏览器的类似，先执行Next Tick Queue所有任务，再执行Other Microtask Queue所有任务。 但宏队列执行时会依次执行队列中的每个任务直至队为空才开始再次执行微队列任务

4. MacroTask包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering

5. Microtask包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver


## async operation

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


### MutationObserver

`MutationObserver` 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分


### Object.observe

异步地观察一个对象的变化 已废弃 

### script attribute: async/defer

`<script type="module" async />`  

- type：
  - 空 默认 普通js
  - module 视为js模块， 代码内容延后处理(defer不生效)
- defer: 立即下载，延迟执行  `DOMContentLoaded` 事件前执行
- async: 异步并行请求，并尽快解析和执行 并不保证按照先后顺序执行 

### web worker

指的是一种可由脚本创建的后台任务，任务执行中可以向其创建者收发信息  

Web Worker 为 JavaScript 创造了多线程环境，允许主线程创建 Worker 线程，将一些任务分配给 Worker 线程运行，处理完后可以通过 postMessage 将结果传递给主线程。优点在于可以在一个单独的线程中执行费时的处理任务，从而允许主线程中的任务（通常是 UI）运行不被阻塞/放慢。

使用 Web Worker 时有以下三点需要注意的地方：

在 Worker 内部无法访问主线程的任何资源，包括全局变量，页面的 DOM 或者其他资源，因为这是一个完全独立的线程。  
Worker 和主线程间的数据传递通过消息机制进行。使用 postMessage 方法发送消息；使用 onmessage 事件处理函数来响应消息。 
Worker 可以创建新的 Worker，新的 Worker 和父页面同源。Worker 在使用 XMLHttpRequest 进行网络 I/O 时，XMLHttpRequest 的 responseXML 和 channel 属性会返回 null。  
Web Worker 主要应用场景：

处理密集型数学计算
大数据集排序
数据处理（压缩，音频分析，图像处理等）
高流量网络通信
参考资料


### MessageChannel

Channel Messaging API 的 `MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个 `MessagePort` 属性发送数据。

DEMO: iframe传值
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