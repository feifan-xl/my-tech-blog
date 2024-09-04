


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
  
  