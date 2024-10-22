

## promise

用于处理异步操作的一种对象，表示一个未来可能会返回的值 

使用更简洁的方式处理异步代码，避免传统的回调地域， 提高代码的可读性 


特点:
  1. 链式调用: 通过 then() 可依次执行多个异步任务
  2. 避免回调地域: 异步代码更清晰
  3. 状态不受外接影响，一旦改变就不会再变


## polyfill

主要功能:
  1. base 
    - 异步
    - 三种状态
  2. then 
    - 链式调用 
  3. promiseResolution
    - 类型处理: promise,普通对象,引用对象

  4. other

*code*
  ```js
    class MyPromise {
      static Pending = 'pending';
      static Fullfilled = 'fullfiled';
      static Rejected = 'rejected';
      constructor (execute) {
        this.value = null;
        this.error = null;
        this.state = MyPromise.Pending;
        this.onFulfilledCbs = [];
        this.onRejectedCbs = [];

        function resolve (value) {
          if (this.state === MyPromise.Pending) {
            this.value = value;
            this.state = MyPromise.Fullfilled;
            this.onFulfilledCbs.forEach(cb => cb(value))
          }
        }
        
        function reject (error) {
          if (this.state === MyPromise.Pending) {
            this.error = error;
            this.state = MyPromise.Rejected;
            this.rejectedCb.forEach(cb => cb(error))
          }
        }
        
        try {
          execute(resolve, reject)
        }
        catch (e) {
          reject(e)
        }
      }

      then (onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
          if (typeof onFulfilled !== 'function') onFulfilled = i => i;
          if (typeof onRejected !== 'function') onRejected = error => { throw new Error(error) }
          const handleResolve = () => {
            queueMicrotask(() => {
              try {
                const x = onFulfilled(this.value)
                MyPromise.resolvePromise(promise2, x, resolve, reject)
              }
              catch (e) {
                reject(e)
              }
            })
          };
          const handleRejected = () => {
            queueMicrotask(() => {
              try {
                const x = onRejected(this.error)
                MyPromise.resolvePromise(promise2, x, resolve, reject)
              }
              catch (e) {
                reject(e)
              }
            })
          };
          if (this.state === MyPromise.Pending) {
            this.onFulfilledCbs.push(handleResolve);
            this.onRejectedCbs.push(handleRejected);
          }
          else if (this.state === MyPromise.Fullfilled) {
            handleResolve();
          }
          else if (this.state === MyPromise.Rejected) {
            handleRejected();
          }
        })
        return promise2
      }

      static resolvePromise (promise2, x, resolve, rejected) {
        if (x == promise2) return new Error('');
        let called = flase
        if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
          try {
            let then = x.then;
            if (typeof then === 'function') {
              then.call(
                x,
                value => {
                  if (called) return
                  called = true
                  resolve(value);
                },
                error => {
                  if (called) return
                  called = true
                  rejected(error);
                }
              )
            }
            else {
              if (called) return
              called = true
              resolve(x)
            }
          }
          catch(e) {
            if (called) return
            called = true
            rejected(e)
          }
          return
        }
        if (called) return
        called = true
        resolve(x)
      }

      finally (onFinally) {
        return this.then(
          value => Promise.resolve(onFinally()).then(() => value),
          reason => Promise.resolve(onFinally).then(() => {throw reason})
        )
      }

      catch (onCatch) {
        return this.then(null, onCatch)
      }

      static all (promises) {
        if (!promises[Symbol.interator]) return MyPromise.reject(new TypeError(''));
        return new MyPromise((resolve, rej) => {
          let len = promises.length;
          let res = [];
          if (len == 0) return resolve(res);
          let resCount = 0;
          for (let i = 0; i < len; i++) {
            MyPromise.resolve(promises[i])
              .then(val => {
                res[i] = val;
                resCount++;
                if (resCount == len) {
                  resolve(res);
                }
              })
              .catch(rej)
          }
        })
      }

      static race (promises) {
        return new MyPromise((resolve, reject) => {
          if (!promises[Symbol.interator]) return reject(new TypeError(''));
          for (const promise of promises) {
            MyPromise.resolve(promise)
              .then(resolve, reject)
          }
        })
      }

      static resolve (i) {
        return new MyPromise(res => res(i))
      }

      static reject (i) {
        return new MyPromise((_, rej) => rej(i))
      }

      static allSettle (promises) {
        return new MyPromise((resolve, reject) => {
          if (!promises[Symbol.interator]) reject(new TypeError(''));
          let len = promises.length;
          let couter = 0;
          let result = [];
          const returnFn = () => {
            couter++;
            if (couter === len);
            resolve(result);
          };
          for (let i = 0; i < len; i++) {
            const promise = promises[i]
            Promise.resolve(promise)
              .then(value => {
                result[i] = {
                  status: MyPromise.Fullfilled,
                  value
                }
                returnFn();
              })
              .catch(reason => {
                result[i] = {
                  status: MyPromise.Rejected,
                  reason
                }
                returnFn();
              })
          }
        })
      }
    }
  ```