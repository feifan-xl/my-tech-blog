



### some api

- String.prototype.charCodeAt(strIndex?)
  'a'.charCodeAt(0) => 97
  'A'.charCodeAt(0) => 65
  '0'.charCodeAt(0) => 48







### 响应式/自适应 ？
-对比项	响应式	自适应
工作量	一套代码，少	多套代码，工作成本高
用户体验	良好	更加针对性的内容设计，体验突出
适应性	布局灵活，适应各类屏幕大小	基于UA检测，对不同屏幕大小的适应较差
性能	网页需要根据窗口调整，有一定性能损耗	性能相对好


### 函数声明提升
```js
if (true) {
  function g () {
    console.log(1)
  }
}
g() // 1
 

if (g) {
  function g () {
    console.log(1)
  }
}
g() // error
```

### h5
deeplink
webview
file
H5 唤起 App









虚拟列表实现 




