

## vue2.x

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





## vue3


### 响应式特点 

sum:
- 支持监听 对象 和 数组 的变化。
- 对象嵌套属性只代理第一层，运行时递归，用到时才代理，也不需要维护特别多的依赖关系，提高了性能和效率。
- 目前能拦截对象的13种方法，动态属性增删都可以拦截，新增数据结构全部支持。
- Vue3提供 ref 和 reactive 两个API来实现响应式。

*相关问题*
1. 什么是proxy
  - es6中的新增的方法，用于创建一个*目标对象*的代理，拦截相关操作
2. 为什么需要reflect
  - 用来改变目标对象内部的this指向
  ```js
    const target = {
      get m () {
        console.log(this === proxy)
      }
    }

    const handler = {};

    const proxy = new Proxy(target, handler);

    target.m // false
    proxy.m // true
  ```
3. proxy 只会代理对象的第一层？
  - 通过 Relect.get() 的返回值是否是 object
    - 是，通过reactive做代理，这样就可以嵌套代理了
4. 惰性响应式
  - 对于对象深层次的代理，只代理第一层， 剩下的访问时再添加相应的代理
5. 解构丢失响应式？
  - 如果 ES6 解构出来的是 基本数据 类型， 响应式就会丢失
  - 可使用toRefs()
  ```
    const state = reactive({
      foo: 1,
      bar: 2
    })

    const stateAsRefs = toRefs(state)

    // 这个 ref 和源属性已经“链接上了”
    state.foo++
    console.log(stateAsRefs.foo.value) // 2

    stateAsRefs.foo.value++
    console.log(state.foo) // 3
  ```

#### reative 

1. reactive 代理整个对象，一般用于引用类型
2. reactive 函数利用 proxy 对象实现了对普通对象的代理，并通过拦截对象的访问和修改操作，实现数据的响应式更新
3. 代理对象中
  - 访问对象属性，触发 get 函数， 收集当前属性的依赖
  - 修改对象属性，触发 set 函数，更新属性值，并通知所有依赖该属性的地方进行更新
4. 使用 Reflect 完成原本的操作 get set (reflect 为了保证目标对象的this指向正确)

reactive 响应丢失 


####   ref

1. 用于生成响应式对象，一般用于 基本类型
2. 内部进行了一个封装，并设置set/get 方法， 通过.value 访问时就会被劫持 从而实现响应式
3. 当接收的事对象或数组时，内部使用 reactive 去实现响应式  


#### reactive & ref

1. 使用上有区别
2. 本质上， ref是一个 包裹对象
  - 如果是引用类型， 这相同
  - 如果是简单类型，会使用一个类去替代， .value就是这个值，然后在使用reactive去实现响应式 


### watch & watchEffect

- watch 
  - 作用是对传入的某个或多个值的变化进行监听
  - 接收两个参数，第一个参数可以是不同形式的“数据源”，第二个参数是回调函数，回调函数接收两个参数新值 newval 和旧值 oldVal；也就是说第一次不会执行，只有变化时才会重新执行。
- watchEffect
  - 是传入一个立即执行函数，所以默认第一次也会执行一次
  - 不需要传入监听内容，会自动收集函数内的数据源作为依赖，在依赖变化的时候又会重新执行该函数，如果没有依赖就不会执行
  - 而且不会返回变化前后的新值和老值。
- watch加 Immediate: true也可以立即执行。

### defineModel()



### suspence

内置组件， 在组件数中协调对异步依赖的处理


### teleport

### 生态相关

- pinia
- vite
- vue-router
- nuxt



## 原理及相关

### 响应式
- proxy reflect
- computed 
- watch
- 非原始值
  - reactive shallowReactive
  - readonly
  - array
  - set map
- 原始值
  - ref
  - 响应丢失
  - 自动脱 ref
  - toRef

1. 怎么处理分支切换时 副作用函数
  - 每次副作用函数执行时， 都将其在之前与之关联的依赖合集中删除
2. 避免effect 无限递归
  - 采用栈结构，在effect收集时 进行层层处理
3. proxy 遇到继承时 多次执行副作用
  - 通过receiver判断当前代理对象是否是被代理者
4. 为什么proxy结合reflect使用
  - 确保this指向正确
5. reactive shallowReactive
  - 当代理的对象是多层嵌套时 副作用函数在get时只收集了key(object)
  - 因此出现shallowreactive(浅层)响应式  深层还需要添加遍历
6. readonly
  - 不需要响应式
7. 怎么对数组进行处理
  - for..in
    - ownKeys
        - 使用length属性建立响应链接
  - include
      - 对数字元素的代码对象进行缓存，避免重新创建 
  - 隐式修改length
    - 屏蔽了对修改长度属性方法调用时，length属性set代理
8. set & map
  - 数据污染: 将响应式数据设置到了原始数据上
  - 在set时，判断下是否是原始数据
9. ref
  - 本质是基于reactive方法的封装
10. 响应丢失: 解构 扩展等操作后 赋值时为普通对象 
  - 可以采用toRef
    - 对响应式对象的封装
    ```
    const newObj = {
      foo: {
        get value() {
          return obj.foo
        }
      },
      bar: {
        get value() {
          return obj.bar
        }
      }
    }
    ```
11. 自动脱 ref: 在template模板上使用ref， 不需要调用.value
  - 原理 编译时 ，会对setup函数 返回的ref对象再进行一次proxy 返回值时.value


### 渲染器

*diff*
- *简单diff*
  - 遍历新的子节点，去旧节点中挨个匹配
-*双端diff*
  - 新旧首尾四个节点相比对
  - 对比成功就继续，失败就新增
-*快速diff*
  - 先处理新旧节点相同的前置节点和后置节点
  - 然后根据节点对应关系，建立索引表，根据新旧节点顺序构造出最大递增子序列
  - 子序列为不需要移动的点，然后进行索引表遍历，不同点就是要更新的节点 


setup 只会在被挂载时执行一次 
  - 返回一个函数， 为render函数
  - 返回一个对象，该函数中包含的数据将暴露个模板使用 

接受两个参数 ```setup(props, setupContext)```
  -  setupContext
    - slots
    - emit
    - attrs
    - expose



### 组件化 


异步组件 
  - 高阶组件 返回值为一个包装组件
  - timeout 
  - error 组件 
  - delay & loading
  - retry

keepalive
  - 本质是假卸载，将组件缓存起来

teleport？？？
  - 组件渲染时， 挂载到目标节点上

transition
  - dom挂载时，将动效附加到该dom上
  - 卸载时，等动效执行完再卸载

### 编译原理 

工作步骤：
  - 分析模板，将其解析为AST (正则匹配，stack结构，构成tree)
  - 将AST转换为用于渲染函数的 js AST
  - 根据 JS AST 生成渲染函数的代码 

```js
function compile(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 JavaScript AST
  transform(ast)
  // 代码生成
  const code = generate(ast.jsNode)
  return code
}
```

1. 为什么保留vnode
  - 渲染函数的灵活性 和vue2的兼容问题 
2. 相关优化: 对动态节点进行靶向更新，静态节点进行提升
  - 动态节点打上补丁标志，同时结合 block(本质是虚拟节点), 存储在dynamicChildren中，以达到靶向更新的目的
  - 静态节点，会进行提升，在此基础上预字符串化，减少创建vnode带来的性能开销和内存占用 
3. 缓存内联事件处理函数 避免不必要的组件更新(props传入，变化重新渲染)



### 宏

1. 宏是什么
    - 宏是一种特殊的代码，由编译器处理并转换为对应的功能代码
    - 语法糖 本质是字符串替换形式

2. 为什么不需要import
    - 编译时已经处理， import 是执行阶段
3. 为什么只能 setup 顶层使用
    - 编译时只会传递 setup 顶层，其他层级的不会处理


### setup

1. 什么是setup
    - 仅作用于编译阶段，用于指定编译规则
2. 编译后变成了什么
    - 编译后 会变成 setup 方法, 方法会返回一个对象
    - 返回的对象包括
        - setup中定义的顶层变量
        - import 导入的内容 
    - template 编译后的 render 中 会将变量名更换为 $setup.[var]

3. setup 的全流程
    - 执行 setup 语法糖编译后的 setup 函数
    - 将 setup 函数中由顶层变量和 import 导入组成的返回值对象经过 proxy 处理后赋值给 vue 实例上的 setupState 属性
    - 执行 render 函数时，从 vue 实例的 setupState 属性的值( 完成了 template 对 setup 顶层变量的访问)
4. 为什么 import 的组件不需要显式注册就可以使用
    - setup 编译后的返回值中就有 import 导入的变量，tempalte 可以直接使用 



### ssr 同构

1. 什么是 hydration
  - 将当前已经渲染的dom元素 以及vue组件所渲染的vnode间建立联系
  - 从html页面中提取由服务端序列化后发送来的数据，用以初始化vueJS应用程序
2. 什么是激活
  - 建立dom与vnode之间的联系
  - 为页面中的dom元素添加事件绑定 
3. 需注意什么
  - 生命周期不同
  - 跨平台api
    - xhr/http 可使用axios
  - 状态污染
    - 模块级别的全局变量，在node中多次执行 
  
  

## diff v2 and v3




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

