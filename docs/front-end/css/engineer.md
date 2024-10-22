
# 工程化




## 预处理

扩展 CSS 功能的一种工具，更具有结构化和模块的代码  
通过预处理器转译为标准css 

常见:
- sass
- less
- stylus


## PostCSS

css 的转译器，类似于babel 

### 原理分析

同babel, 分为三个阶段:
1. parse
2. transform
3. generate




通过插件实现多种功能:
- autoprefixer 自动添加浏览器前缀
- css 变量和嵌套(支持 scss less 等高级语法)
- 优化 css (压缩、 无用代码删除等)
- css next
- custom plugin
  - px to rem




## 模块化

主流方案:
- 命名方式
  - BEM block-element-modifier
  - OOCSS Object-oriented css
  - SMACSS
- css modules
- css in js
  - styled components

### 命名方式

1. BEM
  - block-element-modifier
2. OOCSS 面向对象的css
  - 结构与外观分离
    - 布局与外观分离, 方便复用, 增加可重复的设计单元 
  - 容器与内容分离
    - 容器与内容无关，便于内容的复用 
3. smacss 可伸缩及模块化的css结构
  - 按功能特性分类
    - Base（基础）： 定义全局元素的样式，如html、body和a等标签。
    - Layout（布局）： 负责页面的大致布局结构，如头部、侧边栏、主内容区等。
    - Module（模块）： 页面中可以复用的独立组件或模块。
    - State（状态）： 定义某个模块或布局的状态，例如可见、隐藏、激活等。
    - Theme（主题）： 控制外观变化的样式规则，用于支持不同主题切换。

### CSS Module

如果 js module 一样导入, 每个文件是一个独立模块，最后通过工具将id class混淆成全局唯一的 hash,以避免命名冲突 

特性:
- 作用域
- 命名
- 变量
- 组合

### css in js

- styled componets


## lottie

Lottie 解析 JSON 后生成对应的 JS 对象
JSON文件：
  - 分帧
  - 分图层

然后修改 HTML 中对应的 SVG 元素属性

提供三种渲染模式:
- svg
- canvas
- html 

优势:
1. 还原度
2. svg可伸缩，不会丢帧
3. json 文件小于 gif

不足:
1. lottie-web 文件本身大小
2. 不必须要的帧或图层 可能占据空间 
3. 低端机支持不好  



## Taildwind CSS

> 是一个 PostCSS 插件

通过预制和扩展类样式来实现样式，无需编写大部分css
优点：
- 开发效率高
- 减少css冲突
- 高度可定制性
- 设计灵活度高
- 极致的性能优化: 生产环境下较小 几kb 结合purgecss达到treeshaking功能
- 响应式设计支持:

缺点：
- 初期学习曲线: 类名组合较多 
- html代码膨胀
- 定制复杂性


