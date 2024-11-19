

## next


基于 react 的开源框架， 帮助构建服务端呈现的 react 的应用程序 

- 服务端渲染
- 自动代码拆分: 自动拆分成更小的块，按需加载
  - 流式传输？ 将路由分解为 chunk 
    - 在页面级别，使用 loading.tsx 文件。
    - 对于特定组件，使用 <Suspense>。
- 静态站点生成
- 动态导入

获取数据
- 预取 getStaicProps
- 实时服务器获取 getServerSideprops




部分预渲染
  concurrent API (并发渲染) 结合 Suspense