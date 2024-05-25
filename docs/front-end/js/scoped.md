---
sidebarDepth: 2
---

## execution context

#### 定义
js代码被解析和执行所在环境的抽象概念 

#### 类型
- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

#### 执行栈
所有创建的上下文都被存储在栈中, 遵循 `LIFO` (后进先出）


#### 生命周期(V8执行流程)

es3 
1. 创建阶段 创建上下文 push 到 stack 中
    - 创建变量对象 VO 存放当前执行上下文中创建的变量和值
      1. 创建arguments对象，检查当前上下文的参数，建立该对象下的属性和属性值
      2. 扫描上下文的函数申明：
          1. 每扫描到一个函数什么就会在VO里面用函数名创建一个属性，为一个指针，指向该函数在内存中的地址  
          2. 如果函数名在VO中已经存在，对应的属性值会被新的引用覆盖  
          3. 扫描上下文的变量申明：
              1. 每扫描到一个变量就会用变量名作为属性名，其值初始化为undefined  
              2. 如果该变量名在VO中已经存在，则直接跳过继续扫描
    - 创建作用域链
    - 绑定 this 指向
2. 执行阶段
    - 预解析 -> 创建AO
    - 逐行执行 -> 赋值给AO 并执行函数
    - 执行函数 -> 创建函数执行上下文
3. 回收阶段 -> 出栈


es5 
1. 创建
  - 绑定this
  - 创建词法环境
    - 环境记录器： 存储变量和函数声明的实际位置(let const)
    - 外部环境的引用: 可以访问其外部词法环境，即父级作用域
  - 创建变量环境: 存储 var

## scoped

作用域: 函数或变量的可见区域

主要分类:
  - 全局作用域
  - 函数作用域 -> 只作用于函数内部
  - 块级作用域 -> let const声明,作用于`代码块`(即`{}`)内部

为什么要引进块级作用域？
  - var 副作用 声明提前 
  - var 声明变量有污染 


### lexical scoped

词法作用域，又叫静态作用域，变量被创建时就确定好了，而非执行阶段确定的。也就是说我们写好代码时它的作用域就确定了，`JavaScript` 遵循的就是词法作用域

```js
// var a = 2;
function foo(){
    console.log(a)
}
function bar(){
    var a = 3;
    foo();
}
bar()
```

由于`JavaScript`遵循词法作用域，相同层级的 `foo` 和 `bar` 就没有办法访问到彼此块作用域中的变量，所以输出2

  deno:
  ```js
    for (var i = 1; i <= 5; i++) {
      setTimeout(function () {
          console.log(i)
      }, i * 1000);
    }
    // bind
    for (var i = 1; i <= 5; i++) {
      // 缓存参数
      setTimeout(function (i) {
        console.log(i)
      }.bind(null, i), i * 1000);
    }
    // iife
    for (var i = 1; i <= 5; i++) {
      (function(j) {
        setTimeout(function test() {
          console.log(j)
        }, j * 1000)
      })(i)
    }
    // let
    for (let i = 1; i <= 5; i++) {
      setTimeout(function test() {
          console.log(i)
      }, i * 1000);
    }
  ```

## scoped chain

查找变量时，会从当前上下文的变量中查找，如果没找到 会从父级执行上下文的变量中查找，一直到全局上下文的变量对象 。这个由多个执行上下文的变量对象构成的链表就叫做作用域链

这种设计有以下好处:
  - 避免全局污染
  - 提升性能
  - 避免命名冲突
  - 有利于压缩
  - 保存闭包状态
  - 使用UMD结构颠倒代码顺序

## closure

函数内部嵌套了一个新的函数， 嵌套的函数对外部的函数造成了引用就形成了闭包

使用场景:
  - 避免全局污染
  - 创建私有变量
  - 延迟变量的生命周期

具体应用:
  - currying
  - throttle debounce
  - compose function

原理: 利用了作用域链的特性 和 垃圾回收机制的引用计数规则,闭包的变量并没有保存在栈中,而是js引擎判断是闭包后,在堆空间中创建一个 closure 对象 来保存  

### currying

  把接受多个参数的函数转换成接受一个单一参数的函数

  1. 最简单的currying 
  ```js
    function currying (fn, ...arg1) {
      return function (...arg2) {
        return fn.call(fn, ...arg1, ...arg2)
      }
    }
  ```

  2. 完成累乘
  ```js
    function multiFn(a, b, c) {
      return a * b * c;
    }
    // multi(2)(3)(4);
    // multi(2,3,4);
    // multi(2)(3,4);
    // multi(2,3)(4);
    var multi = curry(multiFn);
    function curry (fn, ...args) {
      return function (...arg) {
        let newArgs = [...args, ...arg]
        if (newArgs.length < fn.length) {
          return curry.call(this, fn, ...newArgs)
        } else {
          return fn.apply(fn, newArgs)
        }
      }
    }
  ```

  3. 利于toString 完成累加
  ```js
    add(1,2)(3)(4) == 10
    add(1,2)(3)(4)(5) == 15

    function add (...arg1) {
      let arg = [...arg1]
      const _add = function (...arg2) {
        arg = [...arg, ...arg2]
        return _add
      }

      _add.toString = function () {
        return arg.reduce((a, b) => a + b)
      }
      return _add
    }
  ```

### compose function

组合函数: 将多个存纯函数结合到一起使用

  ```js
    function compose (...fns) {
      return function (x) {
        return fns.reduce((arg, fn) => {
          return fn(arg)
        }, x)
      }
    }

    let add3 = x => x + 3;
    let mul2 = x => x * 2;
    // compose(mul2, add3)(2); -> 7
  ```

