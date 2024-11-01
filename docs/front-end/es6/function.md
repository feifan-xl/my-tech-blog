
## 函数的扩展

### 默认值

1. 函数默认值， 使length属性 失真, 默认值及之后的参数不计入
2. 设置了默认参数时， 函数声明初始化时， 会形成单独的作用域
    ```js
    var x = 1;
    function f(x, y = x) {
    console.log(y);
    }
    f(2) // 2
    ```
3. length 属性 返回没有指定默认值的参数个数，不包括 ...rest


### name

```
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"


(new Function).name // "anonymous"


function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "

```

### arrow function

特性:
  - 写法更加简洁 (关键字 return)
  - 不会绑定关键字 this bind apply 之类的方法
  - 无 arguments
  - 不会干涉关键字 this super new.target(es6新增 检测函数或构造方法是否通过new运算符调用，返回一个指向构造方法或函数的引用)
  - 没有构造函数: function 有 construct 和 函数属性 arrow 没有
  - 不能用与 Generator 函数, 不能使用yield命令


#### this?

```
globalThis.s = 21;

const obj = {
  s: 42,
  m: () => console.log(this.s)
};

obj.m() // 21
```


### 尾调用优化

目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持

尾调用优化依旧有隐式优化和调用栈丢失的问题



```js
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
```
