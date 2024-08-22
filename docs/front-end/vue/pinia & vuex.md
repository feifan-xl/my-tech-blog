



### 使用及原理

将应用的状态分解为多个独立的store, 并通过 provide/inject机制来将它们注入到vue组件中

通过defineStore 定义一个store, 该函数接收两个参数: 一个名为id的字符串,用于标识store, 以及一个state对象 用于定义该store的状态
在组件中 可以使用 $store 访问这些store, 并通过computed 属性来监听他们的变化 


vue2 需要使用 pinia vue plugin
通过vue框架提供的 mixin 能力对this对象的$pinia属性注入, 从而实现全局数据仓库的共享访问


### vuex

state mutations actions
原理:
通过全局注入store对象, 实现组件间状态的共享
vuex是利用vue的mixin混入机制， 在beforeCreate钩子前 注入 vuexlint方法 用来实现store注入到vue组件实例, 并注册了vuex store的引用属性 $store
vuex中state状态的响应式， 是借助了vue data的响应式，将state存入vue实例组件中
