
## promise

异步编程的一种解决方案 

特点:
1. 状态不受外界影响
2. 一旦改变就不会再变

### then

返回值为一个新的promise实例



### 手写promise

主要功能:
1. 基础框架 异步，三种状态
2. then方法，主要promiseResolution
3. promiseResolution，返回可能是promise对象 复杂对象 普通对象

#### base

``` javascript
function Promise (exector) {
    this.state = 'pending'
    this.onfulfilledCallback = []
    this.onRejectedCallback = []
    const self = this
    function resolve (value) {
        if (self.state === 'pending') {
            self.state = 'fulfilled'
            self.data = value
            for (let i = 0; i < self.onfulfilledCallback.length; i++) {
                self.onfulfilledCallback[i](value)
            }
        }
    }
    
    function reject (reason) {
        self.state = 'rejected'
        self.data = reason
        self.onfulfilledCallback(reason)
    }

    try {
        exector(resolve, reject)
    }catch (reason) {
        reject(reason)
    }

}
```

#### then 

```javascript
Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    let promise2
    promise2 = new Promise(function (resolve, reject) {
        if (self.state === 'fulfilled') {
            if (typeof onFulfilled === 'function') {
                try {
                    const x = resolve(self.data)
                    promiseResolution(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }else {
                resolve(self.data)
            }
        } else if (self.state === 'rejected') {
            if (typeof onRejected === 'function') {
                try {
                    const x = onRejected(self.data)
                    promiseResolution(promise2, x, resolve, reject)
                }catch(e) {
                    reject(e)
                }
            }else {
                reject(self.data)
            }
        } else if (self.state === 'pending') {
            self.onfulfilledCallback.push(function (promise1Value) {
                if (typeof onFulfilled === "function") {
                  try {
                    const x = onFulfilled(self.data);
        
                    promiseResolutionProcedure(promise2, x, resolve, reject);
                  } catch (e) {
                    reject(e);
                  }
                } else {
                  resolve(promise1Value);
                }
            })
            self.onRejectedCallback.push(function (promise1Reason) {
                if (typeof onRejected === "function") {
                  try {
                    const x = onRejected(self.data);
        
                    promiseResolutionProcedure(promise2, x, resolve, reject);
                  } catch (e) {
                    reject(e);
                  }
                } else {
                  reject(promise1Reason);
                }
            })
        }
    })

    return promise2
}

```

#### prommiseResolution

```javascript
function promiseResolution (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("chaining cycle"))
    }
    // 如果也是promise对象
    if (x instanceof Promise) {
        if (x.state === 'pending') {
            x.then(function (value) {
                promiseResolution(promise2, value, resolve, reject)
            }, reject)
        } else if (x.state === 'fulfilled') {
            resolve(x.data)
        } else if (x.state === 'rejected') {
            reject(x.data)
        }
        return;
    }
    // 如果是复制对象 需要执行下
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        // 防止多次执行
        let isCalled = false
        try {
            let then = x.then
            if ( typeof then === 'function') {

                then.call(
                    x,
                    function resolvePromise (y) {
                        if (isCalled) return
                        isCalled = true
                        return promiseResolution(promise2, y, resolve, reject)
                    },
                    function rejectPromise (r) {
                        if (isCalled) return
                        isCalled = true
                        return reject(r)
                    })
            } else {
                resolve(x)
            }
        } catch(e) {
            if (isCalled) return
            isCalled = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
```

### promise 其他方法

1. promise.all
    - 参数可以不为数组，但是必须有Iterator接口，且每个成员都是promise实例
    - 如果不是，就会调用promise.resolve方法转为promise实例
2. promise.race
3. promise.resolve, reject
    - resolve
        - 参数类型：
            - promise 实例： 原封不动返回
            - thenable 对象： 先转换为promise对象， 将其变为 resolved状态， 最后执行 then() 方法
            - 无 then 方法 或不是对象： 直接返回新的promise对象，
4. promise.finally
5. promise.catch
6. promise.allSettled() 确保所有的promise都完成，不考虑是否成功
7. promise.any


```javascript
promise.all = function (promises) {
    let result = []
    let count = 0
    return new Promise((resolve, reject) => {
        promise.forEach((i, index) => {
            Promise.resolve(i).then(
                res => {
                    reject[index] = res
                    count++
                    if (count === promises.length) {
                        resolve(result)
                    }
                },
                err => {
                    reject(err)
                }
            )
        })
    })
}

```

```js
promise.race = function (promiseList) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseList.length; i++) {
            promise.resolve(promiseList(i)).then(
                res => resolve(res),
                req => reject(req)
            )
        }
    })
}


```




> 待完成
1. promise 与 generator 结合

```
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```
