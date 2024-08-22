

## 赋值解构

1. 默认值 取值时惰性求值
2. 解构可以是对象， 也可以给对象赋值
    ```js
    let obj = {};
    let arr = [];
    ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
    obj // {prop:123}
    arr // [true]
    ```


原理:
本质是ES6提供的语法糖, 针对 *可迭代对象* 的 *Interator* 接口, 通过遍历器按顺序进行赋值

## 数值扩展

### bigint

```
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity

const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

```


## 数组扩展

### 扩展运算符
数组扩展运算符 `...`, 实现iterator接口
  ```
    Number.prototype[Symbol.iterator] = function*() {
      let i = 0;
      let num = this.valueOf();
      while (i < num) {
        yield i++;
      }
    }

    console.log([...5]) // [0, 1, 2, 3, 4]
  ```
### Array.from
将 array-like 数据转为数组
 
只要是部署了 Iterator 接口的数据结构，Array.from()都能将其转为数组。

### Array.of
弥补了Array的不足
```
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

### api
- Array.at


## 对象扩展


###  遍历
属性的遍历:
1. `for...in` 循环遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)
2. `Object.keys(obj)` 返回一个数组，包括对象自身的(不含继承的)所有可枚举属性（不含 Symbol 属性）的键名
3. `Object.getOwnPropertyNames(obj)` 包含自己所有属性(不含symbol)
4. `Object.getOwnPropertySymbols(obj)` 包含对象自身的所有 Symbol 属性的键名
5. `Reflect.ownKeys(obj)` 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举


### super

指向当前对象的原型对象 
只能在对象的方法中使用， 其他位置报错
```js
const proto = {
  foo: 'hello'
};
const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"

const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};
const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}
Object.setPrototypeOf(obj, proto);
obj.foo() // "world"
```



### 对象的扩展运算


可以读取到对象继承的属性 

```
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
```

等同于 `Object.assign`
```
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

## 运算符的扩展

1. 指数
  ```
    2 ** 2 // 4
    2 ** 3 // 8
  ```
2. 链判断运算符
  ```
    const firstName = message?.body?.user?.firstName || 'default';
    const fooValue = myForm.querySelector('input[name=foo]')?.value
  ```
3. Null 判断运算符
  只有左侧为 null 或 undefined 时， 才会返回右侧值
  ```
    const headerText = response.settings.headerText ?? 'Hello, world!';
  ```



### proxy

ownKeys() 拦截对自身属性的读取操作:
    - Object.getOwnPropertyNames()
    - Object.getOwnPropertySymbols()
    - Object.keys()
    - for...in循环

this: 指向 Proxy 代理


## reflect

设计目的：
- 可以从 Reflect 对象上拿到语言内部的方法
- 修改某些 Object 方法的返回结果
  ```
    // 老写法
    try {
      Object.defineProperty(target, property, attributes);
      // success
    } catch (e) {
      // failure
    }

    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
      // success
    } else {
      // failure
    }
  ```
- 让 Object 的操作变成函数行为
    ```
    // 老写法
    'assign' in Object // true

    // 新写法
    Reflect.has(Object, 'assign') // true
    ```
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Porxy 对象的方法，Reflect 对象上就能找到对应的方法




## generator

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```