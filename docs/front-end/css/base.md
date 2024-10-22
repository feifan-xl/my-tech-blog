

# base




## 标准模式和怪异模式

浏览器解析网页时的两种模式:

*怪异模式*
兼容早期网页设计而保留的一种模式  
特点:
  - 不严格遵守 w3c 的 html和 css 标准
  - 盒模型不一致 width = content + padding + border
  - 部分css特性与布局方式不同，如图片对齐、表格处理等
触发条件:
  - 网页没有声明文档类型 或者 声明了不正确的`Doctype`
  - 特定的浏览器

*标准模式*
特点：
  - 严格遵守 html css 标准
  - 标准的盒模型 width = content
  - 更加一直和可预测的布局和渲染行为

## 伪类 & 伪元素

伪类: `:hover` `:focus` 等选择元素处于特定状态
伪元素: `::before` `::after` 选择元素的内容


## BFC

块级格式化上下文: 一种布局机制 
表示一个独立的渲染区域, 内部的元素在布局上不会影响外面的元素

### 作用 

- 清除浮动: 防止因为内部元素浮动 而引起的高度塌陷问题
- 防止外边距重叠: 避免相邻的块级元素间外边距合并
- 控制子元素布局
- 防止文字环绕浮动元素:  创建bfc时， 浮动元素不会影响文本流动 


### 触发方式 

- 根元素 html
- float 不为none
- position: absolute fixed
- display: inline-block table-cell flex grid
- overflow 不为 visible

## FFC
自适应格式化上下文
flex 布局: 弹性盒子

### 主要属性

- flex-direction 主轴方向
- justify-content 主轴对齐方式
  - flex-start 从起点对齐
  - flex-end 从终点对齐
  - center 居中对齐
  - space-between 首尾与边界对齐，其余项目均匀分布
  - space-around 间距相等， 首尾间距一半
- align-item 交叉轴对齐方式
  - flex-end
  - flex-start
  - center
- flex-wrap 是否换行
  - nowrap
  - warp
  - wrap-reverse

*flex-item*
- flex-grow 占剩余空间比例
- flex-shrink 缩小比例
- flex-basis 初始大小

### 缩写

`flex: 1` -> `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`
- 能够让子元素自动填充剩余空间

`flex: 0` -> `flex-grow: 1; flex-shrink: 1; flex-basis: auto`
- 根据子元素内容或固定尺寸进行布局 

`flex: none` -> `flex-grow: 0; flex-shrink: 0; flex-basis: auto`
- 不会自动调节大小


## float

浮动: 元素脱离文档流

浮动溢出: 高度为auto时，浮动元素不会自动撑高盒子，因此会使内容溢出到容器外面而影响布局 

清除浮动:
- 触发父元素的 bfc
- 父级设置 height
- 结尾加空行div -> clear:both
- 使用伪元素 clear: both
  ```css
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
  ```


## 布局

常见布局方式:
- 流式布局: 文档流正常排列
- 三栏布局
- 水平居中
- 垂直居中


### 三栏布局

圣杯布局: 两边等宽 中间自适应
双飞翼: 中间固定 

实现方式:
- margin 负值 + float: 
- position + padding:
  - center： `position: absolute; padding: 0 20%`
- position + margin
  - center: `position: absolute; trasform: traslate(-50%)`
- calc: 
  - center: `width: calc(80%)`
- table
- flex
- grid


### 水平居中 
- 行内: text-align：center
- 块级: margin: auto
- 定位: left: 50% margin负值
- transform: translate(x, y)
- flex: justify-content: center
- grid:


### 垂直居中
- 行内: 
  - line-height
  - vertical-align: middle
- 定位 top margin-top
- transform: translate
- flex align-items: center
- grid


## 部分问题

1. 移动端1px问题
  - 屏幕的dpi 不为1, 所以渲染时1px逻辑像素大于1
  - 实现
    - scale(0.5)
    - 媒体查询 设置 0.5px
    - -border-image
  - DPI device-pixel-ratio  设备像素比


