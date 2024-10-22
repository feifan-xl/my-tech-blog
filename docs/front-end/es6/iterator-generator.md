


## iterator 迭代器 

数据遍历协议: 为集合对象添加一种 遍历 接口 

*作用*
  1. 为各种数据结构，提供一个统一简便的访问接口
  2. 数据结构的成员能够按照某种次序排列
  3. 供 for...of 接口消费


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

### 原生支持

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象
> Object 属性无需， 所以不支持 


### 使用场景 

1. 解构赋值
2. 扩展运算符
3. yield* 后面跟的是一个可遍历的结构
4. 其他场合: 数组的遍历
  - for...of
  - Array.from()
  - Map() Set() WeakMap() WeakSet()
  - Promise.all()
  - Promise.race()

### next return throw

*`next`*
  - 遍历操作 每次调用都会返回一个结果对象 
  - `{ value: any, done: boolean }`

*`return`*
  - 提前退出执行
  - 必须返回一个对象 


*`throw`*
  - 主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法


  ```js
    function readLinesSync(file) {
      return {
        [Symbol.iterator]() {
          return {
            next() {
              return { done: false };
            },
            return() {
              file.close();
              return { done: true };
            }
          };
        },
      };
    }
  ```

## generator 生成器

特殊函数，返回一个 `Intertor` 对象  
通过 `function *` 来定义， 使用 `yield` 关键字暂停和恢复函数执行 


应用: 
  1. 部署 Interator 接口 
    - 遍历: ```for...of```
  2. 异步操作的同步化表达
  3. 控制流管理

特点:
  1. 不能当做构造函数使用



### next() throw() return()

- next()是将yield表达式替换成一个值。
- throw()是将yield表达式替换成一个throw语句。
- return()是将yield表达式替换成一个return语句。
  - 手动结束 `Generator` 函数的遍历

  ```js
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

    var c = foo(5);
    c.next() // { value:6, done:false }
    c.return('foo') // { value: "foo", done: true }
    c.next()        // { value: undefined, done: true }
  ```

## async generator

对象的异步遍历器
[Symbol.asyncIterator]
  ```js
    for await (const x of asyncIterable) {}
  ```