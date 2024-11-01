
## rending

*mdn 浏览器工作原理*
  1. 导航
  2. 响应
  3. 解析
  4. 渲染
  6. 交互



## 数据请求

(从输入url开始) 
主要分为以下步骤:
1. URL 输入 -> 合法性 —> 缓存
2. DNS 解析 (多级缓存)
3. 建立 TCP 连接
4. 发送 HTTP/HTPPS 请求(TLS连接)
5. 服务器响应请求
6. 浏览器解析渲染页面
7. http 请求结束， 断开TCP链接


## 解析&渲染

当浏览器进程获取到 HTML 的第一个字节开始，会通知渲染进程开始解析 HTML，将 HTML 转换成 DOM 树，并进入渲染流程。一般所有的浏览器都会经过五大步骤，分别是：

1. PARSE：解析 HTML，构建 DOM 树。
2. STYLE：为每个节点计算最终的有效样式。
3. LAYOUT：为每个节点计算位置和大小等布局信息。
4. PAINT：绘制不同的盒子，为了避免不必要的重绘，将会分成多个层进行处理。
5. COMPOSITE & RENDER：将上述不同的层合成为一张位图，发送给 GPU，渲染到屏幕上。

关键步骤：
- dom tree & cssom tree
- render tree (样式)
- layout tree (尺寸 位置)
- paint



## Parse 解析

#### 解析 HTML 构建 DOM tree

1. Conversion(转换): 浏览器从网络或磁盘读取 html 文件原始字节,根据指定文件编码(如 UTF-7)将字节转换为字符
2. Tokenizing(分词解析): 浏览器根据 HTML 规范将字符串转换为不同的 token (标记)（如 html, body）
3. Lexing(语法分析): token 将被转换为对象，这些node 对象包含了 HTML 语法的各种信息，如属性、属性值、文本等
4. DOM construction(DOM构建): 将上一步产生的节点对象链接在一起，构成一个树状结构(DOM tree)

#### 预扫描加载器

在主线程构建 DOM tree 时，预加载扫描器将解析可用的内容并请求资源, 如 CSS、JS、web 字体，以此来减少加载带来的阻塞

#### Javascript 可能阻塞解析

在 HTML 解析器发现 script 标签时，会暂停解析，转而下载、解析和执行 js (因为js可能会改变 dom 结构)  
为此可使用`defer`或`async`属性，或将script标签放在 body 标签结束前

#### css 阻塞？

CSSOM 和 DOM 是并行构建的，构建 CSSOM 不会阻塞 DOM 的构建。但 CSSOM 会阻塞 JS 的执行，因为 JS 可能会操作样式信息。虽然 CSSOM 不会阻塞 DOM 的构建，但在进入下一阶段之前，必须等待 CSSOM 构建完成。这也是通常所说的 CSSOM 会阻塞渲染。




## render 

渲染步骤包括样式、布局、绘制，在某些情况下还包括合成  
在解析步骤中创建的 CSSOM 树和 DOM 树组合成一个渲染树，然后用于计算每个可见元素的布局，然后将其绘制到屏幕上  
在某些情况下，可以将内容提升到它们自己的层并进行合成，通过在 GPU 而不是 CPU 上绘制屏幕的一部分来提高性能，从而释放主线程。


### Style

css 引擎处理样式过程分为三个阶段:
1. 收集、划分和索引所有样式表中存在的样式规则. CSS 引擎会从 Style 标签、css文件及浏览器代理样式中收集所有样式规则，并为这些规则建立索引，以方便后续的高效查询 
2. 访问每个元素并找到适用于该元素的给规则. css 引擎遍历 dom 节点，进行选择器匹配， 并为匹配的节点执行样式设置
3. 结合层叠规则和其他信息为节点生成最终的计算样式，这些样式的值可以通过 window.getComputedStyle() 获取

这个附加了计算样式的 dom tree， 就是 cssom(css object model)


### Layout

有了 DOM 树和 DOM 树中元素的计算样式后，浏览器会根据这些信息合并成一个 layout 树，收集所有可见的 DOM 节点，以及每个节点的所有样式信息。

Layout 树和 DOM 树不一定是一一对应的，为了构建 Layout 树，浏览器主要完成了下列工作：
  1. 从 DOM 树的根节点开始遍历每个可见节点
      - 某些不可见节点（例如 script、head、meta 等），它们不会体现在渲染输出中，会被忽略。
      - 某些通过设置 display 为 none 隐藏的节点，在渲染树中也会被忽略。
      - 为伪元素创建 LayoutObject。
      - 为行内元素创建匿名包含块对应的 LayoutObject。
  2. 对于每个可见节点，为其找到适配的 CSSOM 规则并应用它们。
  3. 产出可见节点，包含其内容和计算的样式。


#### 布局计算

浏览器的布局计算工作包含以下内容：
  1. 根据 CSS 盒模型及视觉格式化模型，计算每个元素的各种生成盒的大小和位置。
  2. 计算块级元素、行内元素、浮动元素、各种定位元素的大小和位置。
  3. 计算文字，滚动区域的大小和位置。
  4. LayoutObject 有两种类型：
      - 传统的 LayoutObject 节点，会把布局运算的结果重新写回布局树中。
      - LayoutNG（Chrome 76 开始启用） 节点的输出是不可变的，会保存在 NGLayoutResult 中，这是一个树状的结构，相比之前的 LayoutObject，少了很大回溯计算，提高了性能。


### Paint 

 LayoutObject 树转换成供合成器使用的高效渲染格式

#### 构建 PaintLayer（RenderLayer） 树

构建完成的 LayoutObject 树还不能拿去显示，因为它不包含绘制的顺序（z-index）。同时，也为了考虑一些复杂的情况，如 3D 变换、页面滚动等，浏览器会对上一步的节点进行分层处理。这个处理过程被称为建立层叠上下文。

将页面分层，可以让一个图层独立于其他的图层进行变换和光栅化处理。


### Compositing

将 layer 进行分块 光栅化，  传个gpu 进行渲染 



#### tiling & rater
1. tiling：将 layer 分成 tiles（图块）。 因为有的 layer 可能很大（如整个文档的滚动根节点），对整层的光栅化操作代价昂贵，且 layer 中有的部分是不可见的，会造成不必要的浪费。
2. tiles 是光栅化的基本单元。光栅化操作是通过光栅线程池处理的。离视口更近的 tiles 具有更高的优先级，将优先处理。
3. 一个 layer 实际上会生成多种分辨率的 tiles。
4. raster 同样也会处理页面引用的图片资源，display items 中的 paint ops 引用了这些压缩数据，raster 会调用合适的解码器来解压这些数据。
5. raster 会通过 Skia 来进行 OpenGL 调用，光栅化数据。
6. 渲染进程是运行在沙箱中的，不能直接进行系统调用。paint ops 通过 IPC（MOJO）传递给 GPU 进程，GPU 进程会执行真实的 OpenGL（为了保证性能，在 Windows 上转为 DirectX）调用。
7. 光栅化的位图结果保存在 GPU 内存中，通常作为 OpenGL 材质对象保存。
8. 双缓冲机制：主线程随时会有 commit 到来，当前的光栅化行为在 pending tree（LayerImpl）上进行，一旦光栅化操作完成，将 pending tree 变为 active tree，后续的 draw 操作在 active tree 上进行。



> https://febook.hzfe.org/awesome-interview/book2/browser-render-mechanism
> https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work
https://segmentfault.com/a/1190000023609412


## repaint & reflow

### 什么是重排重绘

浏览器渲染由获取资源到绘制好图形， 会经历几个阶段:
  parseHtml -> layout -> paint -> composite
  - Parse HTML：相关引擎分别解析文档和样式表以及脚本，生成 DOM 和 CSSOM ，最终合成为 Render 树。
  - Layout：浏览器通过 Render 树中的信息，以递归的形式计算出每个节点的尺寸大小和在页面中的具体位置。
  - Paint：浏览器将 Render 树中的节点转换成在屏幕上绘制实际像素的指令，这个过程发生在多个图层上。
  - Composite：浏览器将所有层按照一定顺序合并为一个图层并绘制在屏幕上。

当dom或cssom 被修改时， 会导致浏览器重复执行 layout paint 步骤，就被成为重绘和重排 


### 引起重排/重绘的常见操作 

重绘: 外观变化时， 如color opacity等  
重排: 
  - 布局结果或节点内容变化时，如height float position
    - 盒子尺寸类型
    - 定位 (正常流，浮动和决定定位)
    - 文档树中元素之间的关系变化
    - 外部信息(视口大小)
  - 获取布局信息时， 如 offsetTop getComputedStyle



### 解决方案

- dom 批量写入和读取 或者vnode documentfragment
- css 
  - 动画效果使用c3，将渲染层提升为合成层，开启 GPU 加速，提高页面性能
  - 避免使用复杂选择器
  - 限制重排范围 需要多次重排的元素 positon 为absolute fixed， 脱离文档流，就不回影响其他元素


### 为什么操作dom 慢

dom是渲染线程中,js是js引擎线程中，操作涉及两个线程间的通信,性能上有损耗  
而且操作dom会触发渲染线程的重绘回流，增加损耗

