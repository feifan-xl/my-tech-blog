


### 3.x的设计目标


- 新特性
  - 更快
    - 响应式系统提升
    - 编译优化 (diff算法优化)
  - 更小
    - 结构重构 基于ESM 支持tree-shaking 
  - 更易于维护
    - composition API
    - ts
    - monorepo
  - 新功能
    - composition API
    - fragment teleport suspense

- 响应式 系统
  - proxy 重写  
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组索引和length
  - 性能提升 对象嵌套属性只代理第一层，运行时递归，用到时才代理
- 编译优化
  - 静态提升 静态节点会被提升到 render 外
  - slot 编译优化， 非动态 slot 属性的更新 只会触发子组件更新
    - 2.0 中父组件更新 slot会强制update
    - 3.0 优化了 slot 的生成， 使得非动态slot中属性的更新只会触发子组件的更新
  - diff 优化 添加 patchFlag 标识， 渲染时直接复用  不需要diff
    - 2.0 深度优先 同级比较 双端比较
    - 3.0 对于不参与更新的元素，做静态标记并提示，只会被创建一次，在渲染时直接复用，不会进行diff
  - 事件缓存
    - 2.0 针对节点绑定的事件 每次触发都要重新生成新的function去更新
    - 3.0 中 提供了事件缓存对象 cacheHandlers 开启后，编译时回自动生成函数事件
- fragmen
  - vue2 基于snabbdom， 为了提高diff 效率， 每个组件是一个vnode， 只有一个节点
  - vue3 重写vdom， 每个组件对应的vnode数量就不那么重要了



### composition API

**动机和目的**
- 更好的逻辑复用和代码组织
- 更好的类型推导 (this 取消)


**mixin的弊端**
- 渲染上下文中暴露的 property 来源不清晰， 很难看出某个 property 是从哪个 mixin 中注入的
- 命名空间冲突. mixin之间的 property 和方法可能有冲突,同时高阶组件也可能和预期的prop有命名冲突
- 性能上, 高阶组件和无渲染组件需要额外的有状态的组件实例, 从而使得性能有所损耗

**composition API**
- 暴露给模板的property来源清晰,因为他们都是被组合逻辑函数返回的值
- 不存在命名空间冲突,可以通过解构任意命名
- 不在需要仅为逻辑复用而创建组件实例

### 特性

- composition API
- fragments
  - vue2 基于 snabbdom ， 每个组件实例对应一个vnode
  - vue3 重写了vdom 机制， 每个组件对应的vnode数量就不那么重要
- 代码结构调整  更利于tree shaking
- 编译优化
  - 静态提升  静态节点会被提升到 render 外 只会渲染一次 
  - patch flag 静态节点  在diff时不做比较
  - 缓存事件监听 开启cacheHandlers 动态事件绑定会被试做 静态标记

### 编译优化

1. 生成 block tree
  - vue 组件越大 渲染越慢， 对一些静态节点 无数据更新 也会遍历
  - 3.0 通过 静态编译阶段 对静态代码模板 分析，生成 block tree(将模板基于动态节点切割的区域)， 个 区块内部的节点结构是固定的，每个区块只需要追踪自身包含的动态节点

2. slot 编译优化
  - 2.0 中父组件更新 slot会强制update
  - 3.0 优化了 slot 的生成， 使得非动态slot中属性的更新只会触发子组件的更新

3. diff 算法优化 增加了静态标记 patchFlag
  - 2.0 深度优先 同级比较 双端比较
  - 3.0 对于不参与更新的元素，做静态标记并提示，只会被创建一次，在渲染时直接复用，不会进行diff
 

### composition API

1. react hook 底层基于链表实现，每次组件 render的时候 都会顺序执行所有 hooks

2. vue 中只会在 注册时 调用一次  
  - 因为 vue 是基于数据响应式的 只要任何一个更改data的地方，相关的function或者template都会被重新计算，因此避开了react可能遇到的性能上的问题


### list

1. fragment
  - vue2  一个组件只有一个vdom，只有一个根
  - vue3 可以有多个根节点
2. teleport(Portal)
3. suspense




### composition API 原理

ref 其实是reactive的再次封装, 主要用来给基本类型使用
在内部生成对应的响应式对象,该内部值挂载到ref对象的value属性上



### watch  watchEffect
  - watchEffect 立即运行, 被动的追踪它的依赖,当这些依赖改变时重新执行该函数
  - watch 是侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数

> https://juejin.cn/post/7139921537896808479#heading-5



### vue 2.7 

compsition API
script setup
css v-bind
对ts的支持(2.7使用ts重写的)

差异:
基于setter/getter 实现的响应式, 所有数组仍有问题
reactive()、ref() 和 shallowReactive() 会直接转换原始的对象而不是创建代理。
避免将数组作为 reactive() 的根值。因为无法访问属性，数组的变更不会被追踪到 (这样做会产生一则警告)。


### vue3.x

通过 proxy 对对象进行代理
get时, 执行track 把 effect 注册到 dep map (依赖集)中
set时, 执行trigger, 把依赖集中 所有effect执行一遍 

weakmap = key ->target目标对象 
          value -> deps map
depsmap = key -> 目标对象的属性
          value -> set() effect list

### v-if and v-for
*Vue2*
- v-for 的优先级高于 v-if，一起使用的话，会先执行循环再判断条件
- 会带来性能方面的浪费（每次都会先循环渲染再进行条件判断），所以不应该将它俩放在一起；
*Vue3*
- v-if 的优先级高于v-for；因为v-if 先执行，此时 v-for 未执行
- 如果使用v-for 定义的变量就会报错；




### vue2 3 响应式原理的区别
2.x中，通过object.defineProperty 将对象的属性转换成getter/setter 的形式来监听他们的变化，当读取属性值的时候会触发getter进行依赖收集，当设置对象属性值时会触发setter,对依赖的订阅者发送通知, 从而进行更新

3.x 通过 Proxy 对数据实现 getter/setter 代理，从而实现响应式数据，然后在副作用函数中读取响应式数据的时候，就会触发 Proxy 的 getter，在 getter 里面把对当前的副作用函数保存起来，将来对应响应式数据发生更改的话，则把之前保存起来的副作用函数取出来执行



您好，我想应聘贵司的前端开发岗位, 期盼回复 谢谢