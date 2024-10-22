

## EC 执行上下文

`execution context`: js 代码被解析和执行所在的抽象环境 

JS 引擎在执行代码时， 会创建一个执行上下文来跟踪代码的运行状态以及相关变量 


按作用范围分为三种:
1. 全局执行上下文
  - 由运行时创建的 全局唯一
  - this 指向的事全局变量
2. 函数执行上下文
  - 每当函数被调用 就会创建一个新的
  - 包含函数内部的变量、参数和内部函数
3. eval 执行上下文 

执行上下文包含三个重要部分:
- 变量对象
  - 包含函数中的所有变量 声明 形参
  - 代码执行上，声明会被提升
- 作用域链: 作用域间的嵌套关系，可以进行变量查找
- this: 

### 执行栈

所有被创建的上下文都会被存储在一个栈中，遵循后进先出的原则

### V8执行流程(变量的生命周期)

#### ES3

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
    - 创建 this 关键字，绑定 this 指向
2. 执行阶段
    - 预解析 -> 创建AO
    - 逐行执行 -> 赋值给AO 并执行函数
    - 执行函数 -> 创建函数执行上下文
3. 回收阶段 -> 出栈


#### ES5

1. 创建
  - 创建词法环境(标识符变量映射)
    - 环境记录器： 存储变量和函数声明的实际位置(let const)
    - 外部环境的引用: 可以访问其外部词法环境，即父级作用域
    - 绑定this
  - 创建变量环境: 存储 var
2. 执行 
  - 引擎会再次读取执行上下文，并用变量的实际值更新VO
  - 编译器再把代码编译为计算机可执行的字节码后执行
3. 回收

## scoped 作用域 

作用域: 定义了函数和变量的可访问性

类型:
- 全局作用域
- 函数作用域 -> 只作用域函数内部
- 块级作用域 -> let const 声明， 作用域代码块`{}`
- 欺骗作用域 -> eval  with
  <!-- todo -->
  <!-- https://juejin.cn/post/7372933691490107430?searchId=20240921153254CF3CB98F91E06DFC2A99 -->


### 词法作用域 (静态作用域)

变量在创建时就已经被确定, 而非执行阶段确定 

*示例1*
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

*示例2*
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


### 作用域链

用于表明作用域间的嵌套关系，在查找变量时，会顺着作用域链进行查找 

这种设计的好处:
  - 避免全局污染
  - 提升性能
  - 避免命名冲突
  - 有利于压缩
  - 保存闭包状态
  - 使用UMD结构颠倒代码顺序


## 闭包

嵌套函数内的子函数对所在函数内的变量持有引用时 就产生了闭包 

函数内部嵌套了一个新的函数， 嵌套的函数对外部的函数造成了引用就形成了闭包


*使用场景*
  - 避免全局污染
  - 创建私有变量
  - 延迟变量的生命周期

*具体应用*
  - currying
  - throttle debounce
  - compose function

*原理*
利用了作用域链的特性 和 垃圾回收机制的引用计数规则
闭包的变量并没有保存在栈中,而是js引擎判断是闭包后,在堆空间中创建一个 closure 对象 来保存  


### 柯里化
将 接收多个参数 的函数转换成 接收一个参数 的函数

好处:
1. 参数复用
2. 延迟计算
3. 代码可读性和模块化

应用场景:
1. 参数预处理
2. 函数组合 

*示例1*
```js
  const currying = 
    (fn, ...arg1) =>
      (...arg2) =>
        fn.call(fn, ...arg1, ...arg2);
```

*示例2*
```js
  const multiFn = (a, b, c) => a * b * c;
  const curry = (fn, ...arg1) => 
    (...arg2) => {
      let args = [...arg1, ...arg2];
      return args.length < fn.length
        ? curry(fn, ...args)
        : fn.call(fn, ...args)
    }
  const multi = curry(multiFn);
  multi(2)(3)(4);
```

*示例3*
```js
  const add = (...arg1) => {
    let args = [...arg1]
    const _add = (...arg2) => {
      args = [...arg2, ...args]
      return _add
    };
    _add.toString = () => args.reduce((a, b) => a + b, 0)
    return _add
  }
  add(1,2)(3)(4) == 10
```

*示例4-组合函数*
```js
  const add3 = x => x + 3;
  const mul2 = x => x * 2;
  const compose = (...fns) =>
    arg => fns.reduce((acc, fn) => fn(acc), arg)
  compose(mul2, add3)(2); // -> 7
```