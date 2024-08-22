


## babel

Babel 是一个JavaScript编译器，用于将现代JavaScript代码（如ES6/ES7/ES8等）转换为向后兼容的版本，以便在较旧的浏览器中运行。Babel主要做的是语法转换，即将新的语法特性（如箭头函数、类、模板字符串等）转换为旧版JavaScript支持的语法。

示例：将const和let转换为var，将箭头函数转换为传统函数表达式等。
用途：使开发者能够使用最新的JavaScript语法，而不必担心浏览器兼容性问题。


### 实现

js 编译器, 按需转换代码, 将ts jsx 或新的语言特性 转换为想要的js代码  

原理: 先转换为 AST, 对 AST 应用各种插件进行处理， 最终输出编译后的js代码

*解析步骤*
1. 解析 parse : 将输入的代码 通过babylon 进行解析 得到 AST  
    - 解析过程： 
      - 词法分析  字符串-> token（类似于AST中的节点）
      - 语法分析  token -> AST

2. 转译 transform : 通过 plugin babel-traverse 对 AST 树进行深度优先遍历 转译 得到新的 AST 树

3. 生成 generate : 通过 babel-generator 将 AST 转换成新的 js 代码, 深度遍历整个 AST


### different with polyfill
- babel: 语法特性  
- polyfill: 新的API  

Polyfill 是一种代码片段或库，用于在旧版浏览器中实现新的Web API或JavaScript特性。Polyfill通常在运行时动态地为缺失的功能提供实现，以确保代码能够正常运行。

示例：如果一个旧浏览器不支持Array.prototype.includes方法，可以使用一个Polyfill来定义这个方法。

javascript
复制代码
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    // 实现细节
  };
}
用途：填补新功能在旧浏览器中的空缺，使现代代码在较旧的环境中也能运行。