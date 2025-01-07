

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


### 优势

完整的框架，在react的基础上，提供了更多的功能和优化
  - 功能 ssr、ssg、isr、api路由等，开发部署更加高效灵活
  - 优化
    - 自动代码拆分
    - 静态站点生成
    - 动态导入 延迟加载
    - 内置大量性能优化
      - Link
      - Script
      - Image
      - 大量缓存 如 fetch不同组件同一请求只发送一次

### 路由

Approuter / PageRouter
  - 特性	Pages Router	App Router
  - 基于文件夹	pages/	app/
  - 渲染模式	SSR, CSR, SSG	SSR, SSG, RSC
    - app 通过 更加细粒度的控制 
  - 数据获取	getStaticProps等	服务端组件直接调用
  - 布局复用	需手动实现	原生支持嵌套布局
  - 路由灵活性	较低	高

- 跳转方式  
  - Link Component 
    - provide prefetching 
  - useRouter hook -> client components
  - redirect function -> server components
  - native history


### 缓存

  - request memoization 
    - react 扩展了fetch API 以自动记住具有相同 URL 和选项的请求
      - 多个位置调用相同数据的获取函数，而只需执行一次
    - 仅持续请求的生命周期
  - data cache
    - 持久
  - full route cache
    - 默认缓存静态路由
  - router cache



部分预渲染
  concurrent API (并发渲染) 结合 Suspense



1. router
  - 跳转方式  
    - Link Component 
      - provide prefetching 
    - useRouter hook -> client components
    - redirect function -> server components
    - native history
  - app router / page router
    - 特性	Pages Router	App Router
    - 基于文件夹	pages/	app/
    - 渲染模式	SSR, CSR, SSG	SSR, SSG, RSC
      - todo 为什么不支持rsc
    - 数据获取	getStaticProps等	服务端组件直接调用
    - 布局复用	需手动实现	原生支持嵌套布局
    - 路由灵活性	较低	高
原理:
  1. code spliting
  2. prefetching
    - Link component, 进入视口会自动预取
      - todo 动态路由预取？
    - router.prefetch()
  3. chaching
  4. partial rendering 部分渲染
    - 同级页面共用layout时
  5. soft navigation
    - 

并行路由
  - slots


2. data fetching
  - 直取
  - 并行&顺序
  - 预加载

isr 增量静态生成
  - 实时性不高
  - 可通过revalidate重新验证

3. rendering
  好处
    - safe
    - 缓存
    - 性能
      - fcp
      - 数据获取
    - seo
    - 流式传输
  - 种类
    - 服务端组件
    - 客户端组件
    - 混合渲染
      - 仅将使用状态的组件用作客户端组件以减少js包大小
      - 不支持 在客户端组件中使用服务端组件
        - 客户端组件状态更改重新渲染？
        - 需要采用 slot 形式 




4. 缓存
  - 机制及用途
    - request memoization 
      - react 扩展了fetch API 以自动记住具有相同 URL 和选项的请求
        - 多个位置调用相同数据的获取函数，而只需执行一次
      - 仅持续请求的生命周期
    - data cache
      - 持久
    - full route cache
      - 默认缓存静态路由
    - router cache

5. 优化
  - 优化
    - 内置组件
      - image 延迟加载，大小自适应
      - link 预取
      - Script 组件 
        - 多组件使用，仅加载一次
        - 通过不同字段来控制加载时机

    - 元数据 seo tdk
    - 静态资源 cdn
    - 分析和监控
  - 图片


关于流式渲染， 是先水合 还是先next stream

6. middleware

7. auth



log4js
pm2 

相关问题:
1. react 的优势
  - 服务端渲染
  - 性能
    - 自动代码拆分
    - 静态站点生成
    - 动态导入 延迟加载
    - 内置大量性能优化
      - Link
      - Script
      - Image
      - 大量缓存 如 fetch
2. 获取数据
  - getStaticProps 构建阶段获取数据生成静态站点
  - getServerSideProps 实时获取服务端渲染
3. 错误处理
  - 自定义错误页面
  - 使用 getInitialProps 服务端错误处理？
  - errorBound
4. 