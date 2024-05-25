


## 一些碎片


### [] == ![]

! 优先级较高 先转换成boolean
```js 
[] == ![]  // true
[] == []  // false
```

转换流程:

x == y
类型相同 -> x === y
null == undefined -> true
string == number -> string转number
boolean == any -> bool转number
object == string or number or symbol -> object 转基本类型
-> false