

## Set

数据结构: 成员唯一 无重复值 的 集合

*实例*
  ```js
    const s = new Set()
    [2,3,4,5,2,2,3,4].forEach(x => s.add(x))
    // s -> [2,3,4]
  ```
- Set 函数可接受数组(或具有 iterable 接口的其他数据结构)作为参数，用来初始化  
- 可通过 add() 方法添加值，不回发生类型转换，判断两个值是否不同，使用的算法类似于 === , 但是 NaN 只能添加一个

### 实例的属性和方法

*属性*
- Set.prototype.constructor 构造函数 默认 Set 函数
- Set.prototype.size 返回 Set 实例成员总数

*方法*
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





## WeakSet

类似于 Set 的结构，不重复值的集合

与 Set 不同点:
1. 值只能是 对象 或 Symbol() 对象
2. 无法进行遍历操作 也无 size clear

对于值的引用为 弱引用(即垃圾回收机制不考虑 WeakSet 对该对象的引用)


## Map

键值对的集合(即 hash 结构)，一种特殊的 `Object`

### 属性和方法

*属性*
- size

*实例方法*
- Map.prototype.set(key, value)
- Map.prototype.get(key)
- Map.prototype.has(key)
- Map.prototype.delete(key)
- Map.prototype.clear()

*遍历方法*
- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

### map 与 {} 区别
1. Map 的 key 可以是任意值， 而 {} 会被强制转换为字符串
2. Map 可以理解为特殊对象
3. 可以记录插入的顺序 并使用 entries 进行遍历
4. 拥有 Interator接口 可以使用 for...of 遍历 


### 转换 

1. Map转换为数组
  ```js
    [...myMap]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
  ```

2. 数组转换为Map
  ```js
    new Map([
      [true, 7],
      [{foo: 3}, ['abc']]
    ])
    // Map {
    //   true => 7,
    //   Object {foo: 3} => ['abc']
    // }
  ```

3. Map转换为对象 (键不是对象)
  ```js
    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }

    const myMap = new Map()
      .set('yes', true)
      .set('no', false);
    strMapToObj(myMap)
    // { yes: true, no: false }
  ```

4. 对象转为 Map
  ```js
    let obj = {"a":1, "b":2};
    let map = new Map(Object.entries(obj));

    function objToStrMap(obj) {
      let strMap = new Map();
      for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
      }
      return strMap;
    }

    objToStrMap({yes: true, no: false})
    // Map {"yes" => true, "no" => false}
  ```


## WeakMap

同 WeakSet

*使用场景*
- 关联 dom 节点时 
- 缓存与对象相关的数据，避免手动管理内存
- 需要与对象的生命周期绑定的任何临时数据存储



## WeakRef

创建对象的 弱引用 

