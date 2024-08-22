
## Set_Map

### set

成员都是唯一的，没有重复值， Set 本身是一个构造函数，用来生成 set 数据结构
```
const s = new Set()
[2,3,4,5,2,2,3,4].forEach(x => s.add(x))
// s -> [2,3,4]
```
- Set 函数可接受数(或具有 iterable 接口的其他数据结构)作为参数，用来初始化  
- 可通过 add() 方法添加值，不回发生类型转换，判断两个值是否不同，使用的算法类似于 === , 但是 NaN 只能添加一个

##### 属性
- Set.prototype.constructor 构造函数 默认 Set 函数
- Set.prototype.size 返回 Set 实例成员

##### 方法
*操作数据*
- add(value) 添加某个值，返回 Set 结构本身
- delete(value) 删除某个值，返回 boolean ， 表示是否成功
- has(value) 返回一个布尔值，表示该值是否为Set的成员。
- clear() 清除所有成员，没有返回值。
*遍历操作*
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器(由于没有键名，只有值名，或者键名等于值名)
- forEach()：使用回调函数遍历每个成员
- for...of



### weakSet

与set区别：
1. 值只能是 对象 和 Symbol() 对象

弱引用: 即垃圾回收时，不会被算作引用次数 



### Map

### Map vs {}
1. Map 的 key 可以是任意值， 而 {} 会被强制转换为字符串
2. Map 可以理解为特殊对象
3. 可以记录插入的顺序 并使用 entries 进行遍历
4. 拥有 Interator接口 可以使用 for...of 遍历 

#### constructor

```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

#### api
- size
- set
- get
- has
- delete
- clear

#### 遍历
- keys
- values
- entries
    for (let i of map.entries()) console.log(i)
- forEach
- for...of

#### 与其他数据的转换

1. 数组 [...map]
2. 对象 
3. json


### weakMap

api上，无法遍历， 无法清空

应用: 在网页的dom元素上添加数据 
```js
const wm = new WeakMap();
const element = document.getElementById('example');
wm.set(element, 'some information');
wm.get(element) // "some information"
```
