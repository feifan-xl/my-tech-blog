
## symbol


### Symbol.prototype.description
es2019新增 

```js
const sym = Symbol('foo');
sym.description // "foo"
```


### Symbol.for Symbol.keyFor
Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局  

```js
a = Symbol('foo')
b = Symbol.for('foo')
c = Symbol.for('foo')
a === b // false
b === c // true
```
*Symbol.keyFor()* 方法返回一个已登记的 Symbol 类型值的key

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```