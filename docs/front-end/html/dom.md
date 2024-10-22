

# DOM

## 事件

*DOMContentLoaded*
html文档被完全加载和解析完成后， 也就是domtree构建完成


*window.onload*
所有资源都加载完成

*document.onreadystatechange*
描述了dom的加载状态:
- loading 正在加载
- interactive 文档加载结束，dom可访问
- complete 全部加载完成 

*beforeunload*
窗口关闭或刷新时

*unload*
beforeunload 后触发 

*pagehide*
浏览器从会话历史中的利益观页面过程中隐藏当前页面  
同 `beforeunload` `hide` 部分移动设备触发不可靠 