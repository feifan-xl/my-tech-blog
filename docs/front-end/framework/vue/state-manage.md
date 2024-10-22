



### pinia

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


### pinia and vuex

1. 删除mutation 
2. 良好的ts支持
3. 使用简单直接调用
4. 无需模块



mutation 已被弃用。它们经常被认为是极其冗余的。它们初衷是带来 devtools 的集成方案，但这已不再是一个问题了。
无需要创建自定义的复杂包装器来支持 TypeScript，一切都可标注类型，API 的设计方式是尽可能地利用 TS 类型推理。
无过多的魔法字符串注入，只需要导入函数并调用它们，然后享受自动补全的乐趣就好。
无需要动态添加 Store，它们默认都是动态的，甚至你可能都不会注意到这点。注意，你仍然可以在任何时候手动使用一个 Store 来注册它，但因为它是自动的，所以你不需要担心它。
不再有嵌套结构的模块。你仍然可以通过导入和使用另一个 Store 来隐含地嵌套 stores 空间。虽然 Pinia 从设计上提供的是一个扁平的结构，但仍然能够在 Store 之间进行交叉组合。你甚至可以让 Stores 有循环依赖关系。
不再有可命名的模块。考虑到 Store 的扁平架构，Store 的命名取决于它们的定义方式，你甚至可以说所有 Store 都应该命名。