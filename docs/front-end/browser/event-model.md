
## event and event 

事件流都会经历三个阶段：

- 事件捕获阶段(capture phase)
- 处于目标阶段(target phase)
- 事件冒泡阶段(bubbling phase)



## event model

事件模型可以分为三种：

- 原始事件模型（DOM0级）
- 标准事件模型（DOM2级）
- IE事件模型（基本不用）

### origin event

事件绑定监听:
- HTML代码中直接绑定

```js
<input type="button" onclick="fun()">
```

- 通过`JS`代码绑定

```js
var btn = document.getElementById('.btn');
btn.onclick = fun;
```


#### 特性

1. 绑定事件快
2. 只支持冒泡，不支持捕获
3. 同一类型事件只能绑定一次

### standard event

该模型中， 一共三个过程:
1. capture
2. target
3. bubble

事件绑定监听函数的方式如下:

```
addEventListener(eventType, handler, useCapture)
```

事件移除监听函数的方式如下:

```
removeEventListener(eventType, handler, useCapture)
```

### ie event

非标准
- `attachEvent(eventType, handler)`
- `detachEvent(eventType, handler)`



## event proxy

事件代理，俗地来讲，就是把一个元素响应事件（`click`、`keydown`......）的函数委托到另一个元素

### event proxy demo

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```
```js
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase === 'li') {
        console.log('the content is: ', target.innerHTML);
    }
});
```


### summary

适合事件委托的事件有：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`

- 减少整个页面所需的内存，提升整体性能
- 动态绑定，减少重复工作
- `focus`、`blur `这些事件没有事件冒泡机制，所以无法进行委托绑定事件
- `mousemove`、`mouseout `这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的
