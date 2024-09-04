

## css


### flex

```
flex: 1  -> flex: 1 1 0%
flex: auto -> flex: 1 1 auto
flex: flex-grow flex-shrink flex-basis
```
flex:
    - flex-grow 放大比例
    - flex-shrink 缩小比例
    - flex-basis 初始大小


### BFC

块级格式化上下文  
形成一共相对于外界完全独立的空间,内部的子元素不会影响到外部的元素

*触发条件*
- 根元素 html
- 浮动元素 float left right
- overflow 不为 visible, 如 auto scroll hidden
- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed

*应用*
- 防止margin重叠
- 清除浮动



### 清除浮动

1. clear: both
2. bfc

