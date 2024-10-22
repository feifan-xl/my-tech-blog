

## router: hash / history

### hash 
onHashChange 事件, 对window.location.hash 进行监控

`window.addEventListener("hashchange", onHashChange);`

demo:
  ```js
    window.addEventListener('hashchange', () => {})

    window.addEventListener('DOMContentLoaded', () => {
        if (!location.href) location.href = '/'
    })
  ```

### history

使用浏览器提供的history接口，对浏览器历史记录栈进行修改和访问，
通过 popstate 事件
    - 监听 用户手机点击浏览器前进后退按钮
    - 对histroyAPI中back forward go等方法的访问
在不刷新页面的情况下， 实现界面的局部内容替换


使用 `onpopstate` 监听history路由的变化
但是只能监听到 history.go forward back. 无法监听到pushState


> 需web-server进行配置，将所以的内容都转到静态资源页面

### abstract  

通过数字模拟浏览器历史记录栈
