


## async

1. 异步操作函数, 会返回一个promise
2. 用于暂停代码，等待异步操作完成后继续

### 异步

异步编程的几种处理方式:
  - 回调
  - 事件监听
  - 发布/订阅
  - promise
  - generator
  - async/await

### 使用

结合promise或其他异步函数使用 
  ```js
    const getData = () => new Promise(resolve => setTimeout(
      () => resolve('data'), 1000));
      
    async function fn () {
      a = await getData()
      console.log(a) // 'data'
    }
  ```

### polyfill
本质为 generator 函数的语法糖 

generator 实现async
  ```js
    const spawn = genF => () => new Promise((res, rej) => {
      const gen = genF();
      const step = (fn) => {
        let next;
        try {
          next = fn();
        } catch (e) {
          return rej(e)
        }
        if (next.done) {
          return res(next.value)
        }
        return Promise.resolve(next.value).then(val => step(() => gen(val)))
      }
      step(() => gen.next());
    })
    const getData = (ms, i) => new Promise(res => setTimeout(() => {
      console.log(i)
      res(i)
    }, ms));
    function * genF () {
      const a = yield getData(1000, 1)
      console.log('get1', a);
      const b = yield getData(2000, 2);
      console.log('get2', b)
      return 11
    }

    var fn = spawn(genF)
    fn().then(res => console.log('end', res));
  ```


### vs promise

解决相同问题
不同:
  1. 错误捕获
    - promise then catch
    - async/await try-catch/then
  2. 书写方式
    - 链式调用
    - 同步写法
  3. 兼容性
    - es6
    - es7