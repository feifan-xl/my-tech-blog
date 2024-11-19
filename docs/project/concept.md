

## ssr

1. MPA
2. SPA
3. CSR client side rendering
4. ssr server side rendering
5. ssg statuc site generation 静态站点生成
6. isr increme static regeneration 增量静态再生
  - 通过设置自动刷新间隔，实现静态页面定时生成
  - nextjs code
    ```js
      export const getStaticProps: GetStaticProps = async () => {
        const res = await fetch('https://localhost:3000/api/articles').then((res)=>res.json());

        return {
          props: { data: res },
          revalidate: 20,
        };
      };
    ```
7. streaming ssr 流式渲染
  - 借助 http 的分块传输机制，服务端不断向浏览器传输内容，浏览器边接收变渲染
  - react 使用 suspense 来实现， 先占位后替代 
8. rsc react server component 服务端组件
  - 组件级别
    - 服务端组件 服务端渲染 依赖无需打包 无需水合
  - 好处
    - 减少 bundle size
    - 减少 水合
  - 坏处
    - 弱网
    - 开发难度
    
