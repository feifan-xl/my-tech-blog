

### var vs let 

#### 作用域（Scope）：

var声明的变量具有函数作用域或全局作用域。如果在函数内部声明，则在整个函数内有效；如果在函数外部声明，则在整个脚本或全局范围内有效。
let声明的变量具有块级作用域（block scope）。块级作用域指的是由一对花括号 {} 包裹的代码块，例如 if 语句、for 循环等。let声明的变量仅在该代码块内有效。

#### 变量提升（Hoisting）：

var声明的变量会被提升到其作用域的顶部。这意味着变量可以在声明之前使用，尽管在代码执行之前它的值是undefined。
let声明的变量也会被提升，但不会初始化。这意味着变量在声明之前不能被使用，尝试这样做会导致ReferenceError。

#### 重复声明：

var允许在同一个作用域内重复声明同一个变量。
let在同一个作用域内不允许重复声明同一个变量。

*暂时性死区*：


#### 全局对象属性：

当在全局作用域中使用var声明变量时，该变量会成为全局对象（例如浏览器中的window对象）的一个属性。
使用let声明的全局变量不会成为全局对象的属性。


### let const

特性:
    - 不存在变量提升
    - 暂时性死区
    - 不允许重复声明
    - var 会与 window 想映射(转换为一个属性) let不在window上

    
*块级作用域*
函数声明类似于 let， 浏览器的实现可以不遵守上面的规定:
- 允许在块级作用域内声明函数。
- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。




## 块级作用域


es6:

```
{
  let x = 10;
  console.log(x); // 输出: 10
}
console.log(x); // ReferenceError: x is not defined

if (true) {
  let y = 20;
  console.log(y); // 输出: 20
}
console.log(y); // ReferenceError: y is not defined

if (true) {
  var z = 30;
  console.log(z); // 输出: 30
}
console.log(z); // 输出: 30


```



### 函数声明

es6中， 函数允许在块级作用域中声明函数，类似与let


```
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f(); // inside
}());

// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```
33


## 静态作用域 与 动态作用域

词法作用域（Lexical Scope），也称为静态作用域（Static Scope），是指一个变量的作用域在代码书写时就已经确定，而不是在代码运行时动态决定。在词法作用域规则下，一个变量的作用域由代码的物理结构（也就是源代码的位置）决定。

JavaScript采用词法作用域，这意味着嵌套函数可以访问其外部函数作用域中的变量




