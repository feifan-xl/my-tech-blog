


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

#### ref

1. 用于生成响应式对象，一般用于 基本类型
2. 内部进行了一个封装，并设置set/get 方法， 通过.value 访问时就会被劫持 从而实现响应式
3. 当接收的事对象或数组时，内部使用 reactive 去实现响应式  


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