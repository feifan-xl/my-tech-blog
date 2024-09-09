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
  - 匿名函数 匿名函数的执行环境有全局性，指向window
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
  - super: 以 super.method() 的形式被调用时，method中的this指向super被调用时的this指向


*例*
```js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());  // (foo.bar) 未重新计算
//示例3
console.log((foo.bar = foo.bar)()); // 已重新计算 
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());
```

## bind apply call

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



## 优先级 

- level 19
  - 圆括号 ( … )
- level 18 
  - 成员访问 	… . …
  - 需计算的成员 … [ … ]
  - new（带参数列表） new … ( … )
  - 函数调用 … ( … )
  - 可选链 ?.
- level 17
  - new（无参数列表）new …

```js
function foo() {
  getName = function () { console.log(1); };
  return this;
}
foo.getName = function () { console.log(2); };
foo.prototype.getName = function () { console.log(3); };
var getName = function () { console.log(4); };
function getName() { console.log(5); }
new foo.getName();
  // -> new (foo.getName)()
new foo().getName();
  // -> (new foo()).getName() 
new new foo().getName();
  // -> new ((new foo()).getName)()
```
