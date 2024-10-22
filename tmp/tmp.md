







工程化？
通过工具和流程的优化，
提供代码质量，交互质量，开发效率，协助效率

- 代码管理和版本控制
- 自动化 CI/CD 
- 脚手架
- 性能统计和错误监控





性能关键指标
- LCP 最大内容渲染时间，衡量页面加载速度
- FID 首次输入延迟，衡量页面的交互性
- CLS 累积布局偏移，衡量页面的视觉稳定性 ？？？

https://segmentfault.com/blog/sasasa




globalThis 与window

esbuild

tailwindcss
styled components  emotion  css-in-js




### 关于 lowcode
- 执行效率 
- 学习记忆成本
- 复用性和可维护性 
- 问题排查难度 

### umd

本质是兼容 commonjs 和 amd 两种规范的代码语法糖，通过判断执行上下文中 是否包含 define module 来包装模块代码 



webpack 扩展能力极强， 
  黑盒严重
  性能低



vite 对于大型项目 首屏几千模块 开销大
  rollup 
    产物格式极为干净，产物结果对 TreeShaking 非常友好
    在大型项目上有提升空间 产物优化能力较弱 缺失bundle spliting 等能力导致业务很难做精细的优化
    commonjs的支持
    编译性能不足


    esbuild
      - 产物性能难以精细化 
      - 



模块转换
rollup transform 
webpack loader 