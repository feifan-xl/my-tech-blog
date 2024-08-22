---
sidebarDepth: 2
---


## key word

### reactive object


Vue2 通过Object.defineProperty
Vue3 通过Proxy 劫持state中各属性的 setter getter 通过getter收集依赖

### bind

通过 `v-model` 实现双向绑定， 通过v-bind v-on 等语法糖  
在触发元素对应事件时更新数据 ViewModel， 在Viewmodel更新时通过更新到元素的对应属性view上

### MVVM

- Model：模型层，负责处理业务逻辑以及和服务器端进行交互。
- View：视图层，将数据通过 UI 展现出来。
- ViewModel：视图模型层，连接 Model 层和 View 层。


## 问题
1. 2.x 无法监听到的变化 
  Vue2 `Object.defineProperty`并不能完全劫持数据的变化  
  1. 新创建的属性
  2. 数据的变化， 对数据的原生方法进行了劫持
  3. 利用索引修改数据的方式 

## sum

  - vue 创建实例时， 会遍历data选项的属性, 使用 Object.defineProperty 的 setter/getter 属性对data的属性进行数据的劫持，并在内部追踪相关依赖， 当属性被访问或修改时通知变化
  - 每个组件实例都有响应的 watcher 程序实例， 会在组件渲染的过程中把属性记录为依赖， 之后当依赖项的 setter 被调用时, 会通知 watcher 重新计算， 更新相关组件
  - 弊端
    - 递归遍历, 消耗较大
    - 新加或删除属性无法监听
    - 数组响应需要额外实现
    - map set class 等无法响应
  - 重写了数组方法进行监听, 修改数组索引的方式会监听不到， Array.splice 方式实现
  - $set 实现原理 数组就是 Array.splice


  观察者 结合 订阅发布模式 
  - 实例化时, 对data属性进行数据劫持, 观察者对象，  
  - 组件有watcher 实例，即订阅者，在实例化时， 会进行依赖收集， 把相应的data收集到Dep中(发布者)
  - 数据变化， dep 通知watcher ，然后更新


  - 采用 数据劫持 结合 发布订阅模式
    - 遍历需要观察的数据， 劫持setter/getter属性，getter时收集相关依赖， setter时触发响应 通知给订阅者
    - compiler 解析模板指令， 将模板变量替换为数据， 初始化渲染时 对每个指定对应的节点绑定更新函数，添加监听数据的订阅者， 数据有变 收到通知 更新视图
    - wathcer 订阅者， 是 观察者和compiler 之间的桥梁， 中转站的功能
      - 自身实例化时 往 属性订阅器dep 添加自己 用来收集watcher
      - 属性变化时，dep 执行 notify 通知 watcher 执行update，也就是compiler 添加到订阅者的 回调