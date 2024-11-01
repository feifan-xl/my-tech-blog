

## 基本类型和复杂类型

在 `js` 中,数据类型可分为两类:
- 基本类型(原始值)
- 复杂类型(引用类型)

两者区别为存储位置不同
<!-- todo 涉及js运行 -->


### 基本类型
又称 原始值，主要特性:
- 不可变
- 可使用 typeof进行测试

*主要类型*
- Number
- String
- Boolean
- undefined
- null
- symbol
- bigint

### 复杂类型(引用类型)

本质都是 `Object`:
- Object
- Array
- Function
- Date
- Math
- Map
- ...

#### function 

function 也是一种对象，有对象的部分特点:  
  - name
  - length 返回函数入参的个数
  - 可以增加自定义属性


调用方式`new Function`
- 使用场景: 根据重网络或其他地方获取的字符串,动态创建函数  
- 使用限制: 只能访问全局变量,无法访问`outer function`中的变量
- 语法: 
  ```js
    new Function('a', 'b', 'return a + b')
    new Function('a, b', 'return a + b')
    new Function(['a', 'b'], 'return a + b')
  ```


#### ArrayLike Object

*什么是类数组对象:*
- 拥有 length 熟悉，以数字为键的属性，看起来像数组
- 没有数组的原生方法，如 push pop 等
- 并不是真正的数组

*典型的类数组:*
- argumnets
- NodeList (document.querySelectorAll)

*转换成数组*
  ```js
    Array.prototype.slice.call(arguments)
    Array.from(arrayLikeObj)
    Array.apply(null, arrayLikeObj)
    [].concat.apply([], arrayLikeObj)
  ```


### 区别


1. 声明变量时不同的内存地址分配：
  - 简单类型的值存放在栈中，在栈中存放的是对应的值
  - 引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址
2. 不同的类型数据导致赋值变量时的不同：
  - 简单类型赋值，是生成相同的值，两个对象对应不同的地址
  - 复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象



## 类型转换

分为两种:
- 强制转换(显示)
- 自动转换(隐式)

*强制转换* 使用了对应类型转换API，如:
- Number(), parseInt()
- String()
- Boolean()

**


### 显示

*Number()*
```js
  Number(324) // 324
  Number('324') // 324
  Number('324abc') // NaN
  Number('') // 0
  Number(true) // 1
  Number(false) // 0
  Number(undefined) // NaN
  Number(null) // 0
  Number({a: 1}) // NaN
  Number([1, 2, 3]) // NaN
  Number([5]) // 5
  // Symbol -> Throw a TypeError
  // Object -> 先调用toPrimitive, 再调用toNumber
```

*parseInt(), parseFloat()*
```js
  parseInt('32a3') //32
  parseInt('123.45');   // 123
  parseFloat('123.45'); // 123.45
```

*String()*
```js
  String(123);       // '123'
  String(true);      // 'true'
  String(null);      // 'null'
  String(undefined); // 'undefined'
  String({a: 1}) // "[object Object]"
  String([1, 2, 3]) // "1,2,3"
```

*toString()* 适用于非null undefined
```js
  (123).toString();  // '123'
```

*Boolean*
```js
  Boolean(1);         // true
  Boolean(0);         // false
  Boolean('');        // false
  Boolean('hello');   // true
  Boolean(null);      // false
  Boolean(undefined); // false
  Boolean([]);        // true
  Boolean({});        // true
  Boolean(new Boolean(false)) // true
  Boolean(NaN) // false
```


### 隐式转换

归纳为两种情况发生隐式转换的场景：

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）

#### 自动转换为 boolean


- undefined 
- null 
- false 
- +0 
- -0
-  NaN
-  ""

除了上面几种会被转化成`false`，其他都换被转化成`true`

#### 自动转换为 string

```js
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

#### 自动转换为 number


除了`+`有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值

```js
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```

`null`转为数值时，值为`0` 。`undefined`转为数值时，值为`NaN`

### valueOf and toString

*toString* 获取对象的字符串表示, 如 `'[object Array]'`
*valueOf* 获取对象的原始值

调用方式:
- 隐式：在运算符进行运算时，先调用 valueOf, 如果没有则调用toString

*相关示例*
```js
let myObj = {
  name: 'Alice',
  toString() {
    return `My name is ${this.name}`;
  },
  valueOf() {
    return 42;
  }
};
console.log(myObj.toString());  // 'My name is Alice'
console.log(myObj.valueOf());   // 42
// 隐式调用 valueOf() (在数学运算中)
console.log(myObj + 8);         // 50
myObj == 42 
```

## 遍历

### object

*遍历属性*  

1. 常用的遍历方式,
  - `for...in` 遍历属性 会变量对象的整个原型链 
  - `Object.keys` 自身可遍历对象的值的集合
  - `Object.entries` 遍历自身可枚举属性的键值对
2. 遍历所有， 包括不可枚举属性  
  - `Object.getOwnPropertyNames(obj)` `getOwnPropertySymbols`  
  - `Object.getOwnPropertyDescriptors()`  
  - `Reflect.ownKeys(obj)`  

*遍历值*

  - `Object.values`
  - `Object.entries`



### array

1. forEach, map ...
2. `for...in`
3. `for...of` 不仅支持数组,还支持类数组,也支持字符串遍历


## 类型检测

### 常用检查方法

1. typeof 
  可分辨基本数据类型(null 除外)， 引用类型都为 `object`
2. instanceof
  可以判断对象的类型,  内部运行机制是判断在其原型链中能否找到该类型的原型  
  只能正确判断引用数据类型  不能判断基本数据类型 
3. constructor
  实例对象的 constructor 属性 指向他的构造函数 
4. Object.prototype.toString.call*
  使用 Object 对象的原型方法 toString 来判断数据类型
  ```js
    Object.prototype.toString.call([]) // '[object Array]'
    Object.prototype.toString.call('') // '[object String]'
    Object.prototype.toString.call(2) // '[object Number]'
    Object.prototype.toString.call({}) // '[object Object]'
    // '[object AsyncFunction]'
    // '[object GeneratorFunction]'
    // '[object Proxy]'
  ```

*Object.prototype.toString.call(xx)* 实现原理
  - 若参数(xx)不为 null 或 undefined，则将参数转为对象，再作判断
  - 转为对象后，取得该对象的 [Symbol.toStringTag] 属性值（可能会遍历原型链）作为 tag，然后返回 "[object " + tag + "]" 形式的字符串。


### 特殊方式

1. 数组的检查
  ```js
    Object.prototype.toString.call([]) === '[object Array]'
    [].__proto__ === Array.prototype
    Array.isArray([])
    [] instanceof Array
    Array.prototype.isPrototypeOf([])
  ```

2. 判断是否是NaN
  - isNaN(NaN)
  - Object.is(NaN, NaN)
  - NaN !== NaN

3. isNaN 与 Number.isNaN 的区别
  - 函数 isNaN 接收参数后, 会尝试将参数转换为数值, 不能被转换为数值的值都会返回 true
  - Number.isNaN 会先判断参数是否是数字,  不会进行数据类型的转换 判断 NaN 更为准确

4. == 操作符的强制类型转换 
  判断流程:
  - 判断数据类型是否相同, 不同的化 强制类型转换 
  - 是否在对比 null undefined 
  - 判断两个是否为 string number  是的话转换为 number
  - 判断是否一方为 boolean
  - 一方是object  另一方是  string number symbol,  会把object 转换为 原始类型 

5. js 中的 包装类型
  基本类型是没有属性和方法的 , 但是为了便于操作, 调用基本类型的属性或方法时  会隐私的转换为对象  

6. Object.is
  ```js
    Object.is(NaN, NaN) // true
    Object.is(NaN, 0/0) // true
  ```




## 拷贝

### 浅拷贝

1. `Object.assign(target, source)`
    - 基本类型会被封装， null undefined被忽略
    - 原型链上的属性和不可枚举的属性不能被复制
2. 针对数组
    - `Array.prototype.slice`
    - `Array.prototype.concat`
3. 扩展运算符
    -  `{ ...obj }`
    - `[ ...arr ]`  
4. `for ... in`
  ```js
    function shallowClone (obj) {
      const newObj = {}
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          newObj[prop] = obj[prop]
        }
      }
      return newObj
    }
  ```

### 深拷贝
1. JSON.stringify()
  ```js
  const obj2=JSON.parse(JSON.stringify(obj1));
  ```
但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

2. traverse recursion
  ```js
    function deepClone (obj, hash = new WeakMap()) {
      if (obj instanceof Date) return new Date(obj);
      if (obj instanceof RegExp) return new RegExp(obj);
      if (typeof obj !== 'object' || obj === undefined || obj === null ) {
        return obj;
      }
      if (hash.get(obj)) return hash.get(obj)
      let newObj = {}
      hash.set(obj, newObj)
      for (let key in obj) {
        if (newObj.hasOwnProperty(key)) {
          newObj[key] = deepClone(obj[key], hash)
        }
      }
      return newObj
    }
  ```

## equal

判断是否相等:
1. `==`
2. `===`
3. `Object.is(a, b)`


区别:
1. `==` 将执行类型转换，对不同类型的比较对象进行boolean转换, 转换流程见上
2. `===` 不进行类型转换， 如果类型不同，直接返回false
3. `Object.is()` 即不做类型转换， 也不对 -0，0 NaN等进行特殊处理
  ```js
    Object.is(NaN, NaN) // true
    Object.is(0, -0) // false
  ```