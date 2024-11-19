

## react

用于构建界面的 JS 库 
特点:
1. 声明式
2. 组件化
3. 一次学习，跨平台使用

哲学:
1. 单向数据流
2. 不可变特性 immutability 

本质:
1. 数据驱动视图
2. 一切都是组件
3. 声明式ui

fiber
vdom
diff
hooks


## fiber

定义: 
一个任务调和器， 用于 提高渲染性能 和 可扩展 的一种架构

特点:
  - 优先级可分配
  - 异步可中断 


将同步递归无法中断的更新 -重构-> 异步的可中断更新 
主要：
1. 把可中断的任务拆分成小任务
2. 对将要执行的任务调整优先次序、重做
3. 在父子任务间从容切换
4. 支持 render 返回多个元素
5. 更好的 error bounday

核心：
1. RIC： window.requestIdelCallback()
2. RAF: window.requestAnimationFrame()


架构：
  - schedule 调度器 
    - 时间切片， 优先级调度
  - reconciler 协调器
    - 可中断循环diff 
  - renderer 渲染器
    - vdom 渲染成 dom

  



调度器的优先级:
  - Immediate：最高优先级，会马上执行的不能中断
  - UserBlocking：一般用户交互结果，需要及时反馈
  - Normal：普通等级，比如网络请求等不需要用户立即感知的
  - Low：低优先级，这种可以延后，最后要执行
  - Idle：最低优先级，可以被无限延迟，比如 console



更新流程:
  1. render 阶段: 构建 Fiber对象 (DFS)，构建链表，在链表中标记要执行的DOM操作，可中断
  2. commit 阶段: 根据构建好的链表进行DOM操作，不可中断
 


#### window.requestIdelCallback()
浏览器空闲时段调用

语法
  ```js
    window.requestIdelCallback(callback, ?options: {timeout})
    callback(ideldeadline) // 返回当前帧剩余的空闲时间
  ```
1. 如果timeout 没有被调用， 将被放在事件循环中排队，
2. 返回id， 用来被 cancelIdelCallback

*执行时机*
1. 按每帧时长进行 16.67ms(1s / 60)
2. 如果当前帧没有变化，就回安排时长为50ms的空闲时间(50ms 被认为是瞬时 无感知)


*注意事项*
1. 避免在空闲中改变dom  
  - 改变影响了布局，你可能会强制停止浏览器并重新计算


#### Window.requestAnimationFrame

将每一帧的所有dom操作都集中起来， 在下一次重排前执行 

下次重绘前，执行回调 

vs setTimeout:
  1. 自动合并多个回调，避免不必要的开销。
  2. 与浏览器的刷新同步，不会在浏览器页面不可见时执行回调
  3. 由浏览器内部进行调度和优化，性能更高，消耗的CPU和GPU资源更少


注意:
1. 避免在requestAnimationFrame回调函数中进行大量计算
  - 分批
  - 优化
  - 帧率控制
  - webworker


使用场景：
  1. 数据的分析和上报
  2. 预加载
  3. 检查卡顿(开启一个worker，用来进行心跳检测)


#### 双缓存策略

用于管理更新阶段的一种机制  
通过在内存中维护两份 UI 状态，一份用于渲染当前帧，另一份用于计算下一帧的状态
避免了直接在 DOM 上进行更新操作，从而提高了流畅性


## 生命周期

- 挂载
  - *constructor*
  - getDerivedStateFromProps
  - *render*
  - *componentDidMount*
- 更新
  - getDerivedStateFromProps
  - shouldComponentUpdate
  - *render*
  - getSnapshotBeforeUpdate
  - *componentDidUpdate*
- 卸载
  - *componentWillUnmount*
- hooks
- useEffect
  - 挂载 []
  - 更新 [dep]
  - 下载 return

## hooks

设计初衷 状态 副作用管理
常用hook 及 原理 

组件中触发 react 功能的钩子函数 

设计初衷:
  1. 解决组件间复用状态逻辑问题
  2. 复杂组件难以维护
  3. class 难以理解 

设计目的：
  1. 无生命周期 困扰
  2. 优雅复用 
  3. 无class的复杂性
缺点：
  1. 代码量多
  2. this 指向
  3. 状态逻辑难以复用 
好处
  1. 逻辑复用
  2. 业务代码耦合 逻辑解耦
  3. 写法简单 

原理: 通过函数的调用和闭包的机制来管理状态，使得组件代码更加简洁、易于维护


函数闭包来保存状态，通过数组结构出值来使用，并将值绑定到该组件对应的fiber节点上 

问题：
  1. 为什么只能顶层
    - 确保每次渲染都是按照同样顺序被调用， 多次useState useEffect 之前保持hook正确

> https://fe.azhubaby.com/React/Hooks%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html

### useState

1. 同步/异步
  - 在合成事件、声明周期中，为 异步
  - setTimeout/setInterval、Promise 等原生事件和浏览器原始事件中 为同步 react 调度流程外 不会出现批处理更新 
2. 为什么不直接修改
  - 声明式ui，用来触发更新  
3. 如果拿到更新后的state  
  - 通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果
  - 可以直接给 state 传递函数来表现出同步的情况
  ```js
      this.setState((state) => {
      console.log('函数模式', state.count);
      return { count: state.count + 1 };
    });
  ```


### useEffect

*组件的生命周期*
- componentDidMount: 被添加到屏幕时， 挂载 
- componentDidUpdate: 接收到新的 state 或 props, 作为对交互的响应，组件会更新
- componentWillUnmount: 从屏幕移除时， 卸载 

浏览器渲染完成，异步执行 

### useLayoutEffect

- 浏览器渲染前， 同步执行 
- 阻塞浏览器绘制

### useReducer

将 useState 转换为 useReducer，处理多个state


### useContext


## useCallback useMemo

让不改渲染的组件不去渲染 

v19: useMemo,useCallback,memo -> React.Compiler

useCallback 缓存函数本身
useMemo 缓存结果

### Memo

HOC 优化组件性能， 当组件props没变化， 可以跳过组件的重新渲染

### useMemo

```js
  const cachedValue = useMemo(calculateValue, dependencies)
```
每次重新渲染时都能缓存计算的结果

### useCallback

```js
  const cachedFn = useCallback(fn, dependencies)
```


## ref useRef

Ref 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建 React 元素

Ref 就是能获取到该元素的原始 dom


## 合成事件

v16.x 挂载到document
v17.x+ 添加到渲染 react树的 根dom上 



## 版本

v18:
  - 正式支持并发模式: vnode更新一部分 就渲染一部分
  - 自动批处理： 处理 原生事件 timer promise等不会进行批处理的问题

## 组件通信

单向数据流
- 父<->子 props callback
- 多层 context


## 常见的性能优化 

- react.memo pureComponent 避免不必要重新渲染
- useMemo useCallback 等缓存 避免重复创建
- 按需加载， 懒加载
- 错误边界避免组件在出错时破坏整个应用
- 合理使用reducer context

## ssr

