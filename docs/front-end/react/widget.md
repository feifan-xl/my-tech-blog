


## widget 


1. setState 是异步的吗
  - 在在组件生命周期或React合成事件中，是异步
    - why? 每执行一次都需要重新diff+dom修改
  - 在setTimeout或者原生dom 等react不能控制的事件中，是同步
    - 没有开启事务，所以是同步的

2. 事件机制
  - 合成事件

3. 通信方式
  - props + callback
  - useContext
4. 生命周期
  - 类组件
    - 挂载
      - constructor
      - getDerivedStateFromProps
      - render
      - componentDidMount
    - 更新
      - getDerivedStateFromProps
      - shouldComponentUpdate
      - render
      - getSnapshotBeforeUpdate
      - componentDidUpdate
    - 卸载
      - componentWillUnmount
  - hooks
    - useEffect
      - 挂载 []
      - 更新 [dep]
      - 下载 return

5. 性能优化
  - react.memo pureComponent 避免不必要重新渲染
  - useMemo useCallback 等缓存 避免重复创建
  - 按需加载， 懒加载
  - 合理使用reducer context

6. 为什么hook必须放在最外层，不能在条件循环中
  - hook 是按顺序存储的，每次render必须一一对应，否则出现信息混乱





### source

useState
定义变量后，变量一变化， 就重新render

useEffect
定义变量后，依赖一变化， 就重新render


hooks 如何保存状态
  - React Hooks 保存状态的位置其实与类组件的一致
  - 两者的状态值都被挂载在组件实例对象FiberNode的memoizedState属性中
  - 类组件 直接把state属性挂载上
  - hooks 通过链表挂上
  
```js
export type Hook = {
  memoizedState: any, // 最新的状态值
  baseState: any, // 初始状态值，如`useState(0)`，则初始值为0
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null, // 临时保存对状态值的操作，更准确来说是一个链表数据结构中的一个指针
  next: Hook | null,  // 指向下一个链表节点
};
```

如何更新
  - 每次调用更新函数， 就会在hook对象的 queue 属性上添加一个新的节点
  - 下次执行函数组件时，会根据hook对象上的更新操作链来计算属性

