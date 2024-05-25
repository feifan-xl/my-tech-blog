---
sidebarDepth: 2
---


## definition

`this` 关键字是函数运行时自动生成的一个内部对象，指向当前代码运行时所处的上下文环境  
只能在函数内部使用，总指向调用它的对象（运行时绑定）  

: 
  - 全局函数执行上下文 this指向window
  - 函数执行上下文
    - 直接调用 指向调用的函数
    - call apply 指向绑定的对象
    - bind 永久的绑定到bind的第一个参数
  - 匿名函数 匿名函数的执行环境有全局性，指向window(???)
  - new 指向实例


## bind rules

函数的不同调用方式,`this`有不同的值,主要有以下几种情况:
  - 默认绑定 
    - 默认为全局对象
  - 隐式绑定 
    - 指向调用的函数
    - 如果是匿名函数，指向全局
  - new
    - 指向新生成的实例对象
  - 显示绑定 
    - `bind`
    - `apply(this, [...args])`
    - `call(this, arg1, arg2, ...)`
  - arrow function -> 编译时绑定
  - html event element bind -> target element


## explicit bind polifill

### apply

  ```js
    obj.prototype.apply = function (context, params = []) {
      if (typeof this !== 'function') throw new Error()
      const fn = Symbol('fn');
      context = context || window
      context[fn] = this
      let res = context[fn](...params)
      // delete context[fn];
      Reflect.defineProperty(context, fn)
      return res;
    }
  ```


### call

  ```js
    obj.prototype.call = function (context, ...args) {
      if (typeof this !== 'function') throw error
      const fn = Symbol('fn')
      context = context || window
      context[fn] = this
      let res = context[fn](...args)
      Reflect.deleteProperty(context, fn)
      return res
    }
  ```

### bind

  ```js
    obj.prototype.bind = function (context, ...args) {
      context = context || window
      const fn = this
      return function (...arg2) { 
        return fn.apply(context, [...args, ...arg2])
      }
    }
  ```

## new bind

在`JavaScript`中，`new`操作符用于创建一个给定构造函数的实例对象 

执行了以下步骤: 
  1. 创建一个空对象 
  2. 绑定原型 
  3. 绑定this 
  4. 返回新对象 

  ```js
    function newObject (context, ...args) {
      const obj = Object.create(context.prototype)
      let res = context.call(obj, ...args)
      return typeof res === 'object' && res != null ? res : obj
    }
  ```