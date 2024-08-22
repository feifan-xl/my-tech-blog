

## iterator 迭代器
数据遍历协议 
为集合对象添加一种接口， 用来遍历操作  

作用：
1. 为各种数据结构，提供一个统一简便的访问接口
2. 数据结构的成员能够按照某种次序排列
3. 供 for...of 接口消费


模拟 next
```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

默认Iterator接口
每个可遍历对象都有个 Symblo.iterator 接口, 用来供for...of消费

```js
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```
原生支持:
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象

Object 无原生 Symbol.interator 属性， 因为属性是无序的


对象模拟 iterator 接口
```js
let count = 0
let obj = {
  a: 2,
  [Symbol.iterator]: function () {
    let iterator = { next }
    function next () {
      
      return count < 4 ?
        { value: count++, done: false} :
        { value: undefined, done: true}
    }
    return iterator 
  }
}

for (let i of obj) {
  console.log(i);
}
```


### 调用 iterator 接口的场合

1. 解构赋值
2. 扩展运算符
3. yield* 后面跟的是一个可遍历的结构
4. 其他场合: 数组的遍历
  - for...of
  - Array.from()
  - Map() Set() WeakMap() WeakSet()
  - Promise.all()
  - Promise.race()



### 使用 generator 函数实现 iterator

```js
let myIterator = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2
    yield 3
  }
}
console.log([...myIterator])
```

### return throw

当 for...of 提前 break 或 发生错误时，
调用 iterator 函数执行后返回值中的 return

```

```

## generator 生成器

es6 提供的一种异步编程解决方案  

generator 函数执行后， 返回一个iterator(迭代器)对象
该对象本身也有 Symbol.iterator 属性， 执行后返回自身

声明：
```
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```



### 与 iterator 

for...of 可自动遍历 generator 函数运行时时生成的 Iterator 对象

### next

`yield` 表达式本身总是返回undefined，可以通过`next`方法传递一个参数

```
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```


### 应用

1. 异步操作的同步化表达
2. 控制流管理
3. 部署Iterator接口

### throw(),return()

- next()是将yield表达式替换成一个值。
- throw()是将yield表达式替换成一个throw语句。
- return()是将yield表达式替换成一个return语句。




return 手动结束 `Generator` 函数的遍历
```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```


### this

generator 函数返回的 iterator  是这个 generator 函数的实例  
但是this并未指向实例， 而是指向 正常函数调用方式

```
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

不能作为 构造函数使用 

```js
function* gen(){}
var g = gen();
g[Symbol.iterator]() === g  // true
```



## async generator

对象的异步遍历器
[Symbol.asyncIterator]
```js
  for await (const x of asyncIterable) {}
```