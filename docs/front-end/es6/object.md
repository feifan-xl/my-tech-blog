
## 对象的新增方法

### Object.is()
ES5
- '==' 会自动转换数据类型
- '===' NaN不等于自己

```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### Object.assign()

静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。

1. 浅拷贝
2. 同名属性的替换
3. 数字的处理
4. 取值函数的处理



### Object.getOwnPropertyDescriptors()

- ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象 descriptor  
- ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。


### __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()


Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。

getPropertypeOf():
  - 读取一个对象的原型对象
  - 如果参数不是对象，会被自动转换为对象
  - 如果是null undefined 会报错


### Object.keys() Object.values()，Object.entries()

- keys() 返回自身所有可遍历属性key的 数组
- values() 自身所有可遍历属性的value
- entries 
```
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

### Object.fromEntries()
Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
```

Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

### Object.hasOwn()

```
const foo = Object.create({a: 222})
foo.b = 312
Object.hasOwn(foo, 'b')  // true
foo.hasOwnProperty('b')  // true
Object.hasOwn(foo, 'a')  // false
foo.hasOwnProperty('a')  // false
```