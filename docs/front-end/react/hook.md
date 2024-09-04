

## hook

- 逻辑复用,组件拥有状态
- FP

### useState

useState 的唯一参数是 state 变量的原始值 

state 的值始终 固定 在一次渲染的各个事件内部函数内部

React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。 这就是重新渲染只会发生在所有这些 setNumber() 调用 之后 的原因。

在事件处理函数及其中任何代码执行完成 之后，UI 才会更新。这种特性也就是 批处理


如果是对象，对于修改原对象，是不会变化的

不推荐修改的原因：
- 调试 console可查看变化
- 优化 在props state不变 就可以跳过渲染
- 理念

对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置

避免组件切换后状态不变
- 将组件渲染在不同位置
- 使用 key 赋予组件明确身份


### useReducer

把 useState 转化为 useReducer, 用来处理多个相关的state

通过事件处理函数 dispatch actions；
编写一个 reducer 函数，它接受传入的 state 和一个 action，并返回一个新的 state

使用 useReducer 替换 useState

语法:
`const [data, dispatch] = useReducer(reducer, initialData)`

### useContext

可以让你读取和订阅组件中的 context


### useRef


```js
let countRef = useRef(0);
  function handleClick() {
    // 这样并未重新渲染组件！
    countRef.current = countRef.current + 1;
  }
```
ref	state
- 返回值不同
    - { current: initialValue }	
    - [value, setValue]
- 更改后是否重新渲染
- 数据是否可变
- 读取时间
    - 不应在渲染期间读取 current？

ref 实现
```js
// React 内部
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

主要使用：
- timer ID
- 存储操作dom

sum:
- 脱围机制，保留不用于渲染的值
- 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
- 与 state 不同，设置 ref 的 current 值不会触发重新渲染。


### useEffect


*effect 在dev下执行两次*
- dev下 react有意重复挂在组件，以查找一些错误，帮忙找出需要添加清理函数的effect


#### 生命周期

*组件的生命周期*
- 被添加到屏幕时， 挂载
- 接收到新的 state 或 props, 作为对交互的响应，组件会更新
- 从屏幕移除时， 卸载

<!-- todo -->

### other hook

useCallback & useMemo
- 缓存函数调用的结果
- 缓存函数本身

 


### 组件

- Fragment 不添加额外节点的情况下组合子元素
- Profiler 荀彧编程式 测量 react 树的渲染性能
- StrictMode 严格模式
  - 仅在dev中
  - 有些函数会调用两次  state memo reducer 等 
- Suspense 组件加载前展示内容

