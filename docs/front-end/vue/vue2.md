

## vue2.x

### mvvm with mvc


### 响应式

*原理*
vue中采用 数据劫持 结合发布-订阅模式。通过  Object.defineProperty()  对vue传入的数据进行了相应的数据拦截，为其动态添加get() 与 set() 方法。当数据变化的时候，就会触发对应的 set() 方法，当 set() 方法触发完成的时候，内部会进一步触发 watcher，当数据改变了，接着进行 虚拟dom 对比，执行render，后续视图更新操作完毕。

*创建 更新流程*
- 当一个 vue 实例创建时，vue会遍历 data 中的所有属性，用 Object.defineProperty 给属性设置 getter/setter 方法， 并且在内部追踪相关依赖，在属性被访问和修改时分别调用 getter 和 setter 。
- 每个组件实例都有相应的 watcher 程序实例，它会在组件渲染过程中进行 依赖收集，之后当响应式数据发生变化时，其 setter 方法会被调用，会通知 watcher 重新计算，观察者 Watcher 自动触发更新 render 当前组件，生成新的虚拟 DOM 树。
- Vue框架会遍历并对比 新旧虚拟DOM 树 中的每个节点差异，并记录下来，最后将所有记录的不同点，局部更新到 真实DOM 树上。


*Observer Depend watcher*
- 在数据被读的时候，触发 get 方法，执行 Dep 收集依赖，也就是收集不同的 Watcher。
- 在数据被改的时候，触发 set 方法，对之前收集的所有依赖 Watcher，进行更新。

### 生命周期


*加载渲染过程*
  父组件 beforeCreate
  父组件 created
  父组件 beforeMount
  子组件 beforeCreate
  子组件 created
  子组件 beforeMount
  子组件 mountd
  父组件 mountd
*子组件更新过程*
  父组件 beforeUpdate
  子组件 beforeUpdate
  子组件 updated
  父组件 updated
*父组件更新过程*
  父组件 beforeUpdate
  父组件 updated
*销毁过程*
  父组件 beforeDestroy
  子组件 beforeDestroy
  子组件 destroyed
  父组件 destroyed


