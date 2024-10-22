

## 声明



### 变量声明 

新增 let const 关键字
*特性*
  - 不存在变量提升
  - 暂时性死区
  - 不允许重复声明
  - var 会与 window 想映射(转换为一个属性) let不在window上

### 函数声明

ES6 规定，块级作用域中， 函数声明语句行为类似于 let  
但是考虑到旧代码的兼容，浏览器不遵守，有自己的行为:
- 允许在块级作用域内声明函数。
- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

*示例*
  ```js
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


## 块级作用域

由花括号`{}`创建的一种作用域，内部 let const 声明的变量仅在块内有效

