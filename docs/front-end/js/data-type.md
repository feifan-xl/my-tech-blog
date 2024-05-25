---
sidebarDepth: 2
---

## 1. base type and complex type

在 `js` 中,数据类型可分为两类:
- 基本类型
- 复杂类型(引用类型)

两者区别为存储位置不同 


### base type

主要有以下
- Number
- String
- Boolean
- undefined
- null
- symbol
- bigint


### complex type

又称 `引用类型`, 本质都是 `Object`
- Object
- Array
- Function
- Date
- Math
- Map
- ...

#### Array

#### ArrayLike 

  类数组对象，就是指可以通过索引属性访问元素并且拥有 length 属性的对象  
  常见的 arguments对象, DOM NodeList对象...

  类数组无法使用 forEach、splice、push 等数组原型链上的方法  

  类数组转换为数组  

  ```js
    Array.prototype.slice.call(arguments)
    Array.from(arrayLikeObj)
    Array.apply(null, arrayLikeObj)
    [].concat.apply([], arrayLikeObj)
  ```

### different between base and complex


1. 声明变量时不同的内存地址分配：
  - 简单类型的值存放在栈中，在栈中存放的是对应的值
  - 引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址
2. 不同的类型数据导致赋值变量时的不同：
  - 简单类型赋值，是生成相同的值，两个对象对应不同的地址
  - 复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象


## 2.type conversion

常见的类型转换:
- 强制转换(显示转换)
- 自动转换(隐式转换)

### display conversion

即使用了相应类型转换功能的API, 常见的:
- Number()
- parseInt()
- String()
- Boolean()


#### Number()


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
从上面可以看到，`Number`转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为`NaN`

#### parseInt()

```js
parseInt('32a3') //32
```


#### String()

```js
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```


#### Boolean()

```js
Boolean(NaN) // false
Boolean('') // false
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```


### implicit conversion

归纳为两种情况发生隐式转换的场景：

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）



#### auto conversion to boolean


- undefined 
- null 
- false 
- +0 
- -0
-  NaN
-  ""

除了上面几种会被转化成`false`，其他都换被转化成`true`

#### auto conversion to string

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
#### auto conversion to number

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

### valueof & toString

toString: 返回反映这个对象的字符串 如: `'[object Array]'`

valueOf: 返回它相应的原始值 
  - 如果 已经是原始类型， 就不需要转换
  - 先调用 valueof 如果返回结果不是 string 再调用toString 
  - 如果都没有返回原始类型， 就会报错

- 在进行对象运算时，将优先调用 toString 方法，如若没有重写 toString 方法，则会调用 valueOf 方法；如果两个方法都没有重写，则会调用 Object 上面的 toString
- 当进行强制类型转换时，如果转换成字符串则会调用 toString ，转换成数字则会调用 valueOf
- 使用运算符进行运算时，valueOf 的优先级高于 toString

#面试题分析
```js
a = function () {}
a.valueOf = function () {return 1}
a == 1 // true

```
### traverse

#### object

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


#### array

1. forEach, map ...
2. `for...in`
3. `for...of` 不仅支持数组,还支持类数组,也支持字符串遍历

## 3.check type

通常的检查方法: 

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
  ```

Object.prototype.toString.call(xx) 实现原理
  - 若参数(xx)不为 null 或 undefined，则将参数转为对象，再作判断
  - 转为对象后，取得该对象的 [Symbol.toStringTag] 属性值（可能会遍历原型链）作为 tag，然后返回 "[object " + tag + "]" 形式的字符串。

### problem

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
  ```JS
  Object.is(NaN, NaN) // true
  Object.is(NaN, 0/0) // true
  ```
  
## 4.copy

### shallow clone

1. `Object.assign(target, source)`  
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
### deep clone


#### JSON.stringify()

  ```js
  const obj2=JSON.parse(JSON.stringify(obj1));
  ```

但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

#### traverse recursion

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

## 5. function object

function 也是一种对象，有对象的部分特点:  
  - name
  - length 返回函数入参的个数
  - 可以增加自定义属性

### new Function

- 使用场景: 根据重网络或其他地方获取的字符串,动态创建函数  

- 使用限制: 只能访问全局变量,无法访问`outer function`中的变量

- 语法: 
    ```js
      new Function('a', 'b', 'return a + b')
      new Function('a, b', 'return a + b')
      new Function(['a', 'b'], 'return a + b')
    ```