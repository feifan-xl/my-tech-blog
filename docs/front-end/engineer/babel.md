


## babel

Babel 是一个JavaScript编译器，用于将现代JavaScript代码（如ES6/ES7/ES8等）转换为向后兼容的版本，以便在较旧的浏览器中运行。Babel主要做的是语法转换，即将新的语法特性（如箭头函数、类、模板字符串等）转换为旧版JavaScript支持的语法。

示例：将const和let转换为var，将箭头函数转换为传统函数表达式等。
用途：使开发者能够使用最新的JavaScript语法，而不必担心浏览器兼容性问题。


### 实现

js 编译器, 按需转换代码, 将ts jsx 或新的语言特性 转换为想要的js代码  

原理: 先转换为 AST, 对 AST 应用各种插件进行处理， 最终输出编译后的js代码

*解析步骤*
1. 解析 parse: 将输入的代码 通过babylon 进行解析 得到 AST  
    - string -> token -> AST
    - 解析过程： 
      - 词法分析  字符串-> token（类似于AST中的节点）  遍历字符串 然后按规则switch case
      - 语法分析  token -> AST
2. 转译 transform: 对 AST 树进行深度优先遍历 转译 得到新的 AST 树
3. 生成 generate: 将 AST 转换成新的 js 代码, 深度遍历整个 AST

相关插件:
- babel/parser 将源码转为AST
- babel/tranverse 对AST遍历，维护树的状态，并复杂替换 移除 添加 节点
- babel/generate 通过AST生成源码， 同时生成sourcemap
- babel/types 操作节点的loadsh式工具库
- babel/core babel 的编译器，核心API， 如transform parse, 实现了插件功能




### babel plugin

```js
export default function() {
  return {
   //遍历开始之前
    pre(state) {
      
    },

    visitor: {
      
    },
    //遍历结束后
    post(state) {
      
    }
  };
}

```


1. 更改变量名
2. arrow function -> function 
3. console.log() 附加额外信息 
4. 监控系统自动添加信息
5. eslint
6. 代码压缩
7. 按需加载 (将全部引入转换为指定文件 如```import flatten from "lodash/flatten"; ```)

<!-- todo 考虑实际项目中是否有应用 -->


### preset 

预设的一组plugin和相关配置的集合

Plugin与Preset执行顺序

可以同时使用多个Plugin和Preset，此时，它们的执行顺序非常重要。
    
  先执行完所有Plugin，再执行Preset。
  多个Plugin，按照声明次序顺序执行。
  多个Preset，按照声明次序逆序执行。

    

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












