
// 目录
// 1. Object -> create assign
// 2. instanceof
// 3. deep clone & shadow clone
// 4. inheritance and prorotype
// 5. apply bind call
// 6. new 
// 7. currying
// 8. onion
// 9. promise
// 10. generator to async
// 11. Array reduce flat


// 01. Object -> create assign
class Polyfill01 {
    
  /**
   * 
   * @param {*} proto 
   * @param {*} prototypeObj 
   * @returns 
   */
  create (proto, prototypeObj) {
    if (typeof proto != 'object' && typeof proto != 'function') {
      throw new TypeError('must be object')
    }
    function F () {};
    F.prototype = proto;
    const res = new F();
    if (prototypeObj) {
      Reflect.defineProperties(res, prototypeObj)
    }
    return res;
  }

  /**
   * 
   * @param {*} target 
   * @param  {...any} sources 
   * @returns 
   */
  assign (target, ...sources) {
    sources.forEach(source => {
      const descriptors = Object.keys(source).reduce((acc, cur) => {
        acc[cur] = Object.getOwnPropertyDescriptor(source, cur)
      }, {})

      Object.getOwnPropertySymbols(source).forEach(sym => {
        const descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor
        }
      })
      Object.defineProperties(target, descriptors)
    })
    return target
  }

}


// 2. instanceof
class Polyfill02 {
  instanceof (instance, targetConstructor) {
    let proto = Object.getPrototypeOf(instance);
    let target = targetConstructor.prototype;
    while (true) {
      if (proto == null) return false
      if (proto == target) return true
      proto = Object.getPrototypeOf(proto)
    }
  } 
}


// 3. deep clone & shadow clone
class Polyfill03 {
  
  shadowClone (obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    let res = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = obj[key]
      }
    }
    return res
  }

  deepClone (obj, map = new WeakMap()) {
    if (typeof obj != 'object' || obj === null) {
      return obj
    }
    if (map.has(obj)) {
      return map.get(obj)
    }
    let res = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = this.deepClone(obj[key])
      }
    }
    map.set(obj, res)
    return res;
  }
}


// 4. inheritance and prorotype
function Polyfill04 () {

  const Animal = function () {};
  Animal.prototype.methodA = () => console.log('a');

  // 4.1 原型继承
  function fn41 () {
    const Cat = function () {}
    // Cat.prototype = Animal.prototype
    Cat.prototype = new Animal();
  }

  // 4.2 构造函数继承
  function fn42 () {
    const Cat = function () {
      Animal.call(this)
    }
  }

  // 4.3 组合继承
  function fn43 () {
    function Cat () {
      Animal.call(this)
    }
    // Cat.prototype = Object.create(Animal.prototype);
    // Cat.prototype.constructor = Cat
    (function () {
      function Super () {};
      Super.prototype = new Animal();
      Cat.prototype = new Super();
      Cat.prototype.constructor = Cat
    })();
    const cat = new Cat()
  }
  
  // 4.4 class
  class Cat extends Animal {
    constructor () {
      super();
    }
    methodB () {}
  }
}


// 5. apply bind call
class Polyfill05 {

  static apply (context, args) {
    if (typeof context !== 'function') throw new TypeError('be called must be function');
    context = context || globalThis;
    
    const fn = Symbol('fn')
    context[fn] = this;
    const res = context.fn(...args);
    delete context[fn]
    return res;
  }

  static call (context, ...args) {
    if (typeof context !== 'function') throw new TypeError('be called must be function');
    context = context || globalThis
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    Reflect.deleteProperty(context, fn)
    return res
  }

  static bind (context, ...arg1) {
    context = context || globalThis;
    const fn = this;
    const boundFunction = function (...arg2) {
      const arg = [...arg1, ...arg2]
      // if (new.target == boundFunction) {
      if (this instanceof boundFunction) {
        return new fn(...arg)
      }
      return fn.apply(context, arg)
    }
    return boundFunction;
  }
}

// 6. new 
class Polyfill06 {

  static new (constructor, ...args) {
    // let obj = {};
    // obj.prototype = constructor.prototype
    let obj = Object.create(constructor.prototype);
    let res = constructor.call(obj, ...args);
    return typeof res === 'object' && res !== null
      ? res
      : obj;
  }
}

// 7. currying
class Polyfill07 {

  static currying (fn, ...arg1) {
    return function (...arg2) {
      return fn.call(fn, ...arg1, ...arg2)
    }
  }

  // add(1)(2)(3) == 6
  // add(2)(5,4) == 40
  static add (...arg1) {
    let args = [...arg1];
    let _add = function (...arg2) {
      args = [...args, ...arg2]
      return _add
    }
    _add.toString = function () {
      return args.reduce((acc, cur) => acc + cur, 0)
    }
    return _add;
  }

  // const multiFn = (a, b, c, d) => a * b * c * d
  // const multi = curry(multiFn)
  // multi(1, 2)
  // multi(12, 3)
  static curry (fn, ...arg1) {
    let args = [...arg1]
    const _fn = function (...arg2) {
      args = [...args, ...arg2]
      if (args.length == fn.length) {
        return fn.call(fn, ...args)
      }
      return _fn;
    }
    return _fn;
  }

  // let add3 = x => x + 3;
  // let mul2 = x => x * 2;
  // composeSi(mul2, add3)(2);// -> 7
  static compose (...fn) {
    return arg => fn.reduce((res, f) => f.call(f, res), arg)
  }
}


// 8. onion
class Polyfill08 {
  static fn () {
    class Onion {
      constructor () {
        this.middlewares = [];
      }
      use (md) {
        this.middlewares.push(md)
      }

      async execute (ctx) {
        let len = this.middlewares.length;
        const execute = async id => {
          if (id < len) {
            await this.middlewares[id](ctx, () => execute(id + 1))
          }
        }
        await execute(0);
        return ctx
      }
    }

    const middleware1 = async function (ctx, next) {
      console.log('md 1 start')
      ctx.value += 1
      await next();
      console.log('md 1 end')
    }
    const middleware2 = async function (ctx, next) {
      console.log('md 2 start')
      ctx.value += 1
      await next();
      console.log('md 2 end')
    }
    const middleware3 = async function (ctx, next) {
      console.log('md 3 start')
      ctx.value += 1
      await next();
      console.log('md 3 end')
    }

    const onion = new Onion();
    const ctx = { value: 1 };
    onion.use(middleware1);
    onion.use(middleware2);
    onion.use(middleware3);
    onion.execute(ctx).then(res => console.log(res, 'final'))
  }
}

// 9. promise

class Polyfill09 {

  static demo () {
    const promise = new Promise((res, rej) => {
      console.log(1);
      setTimeout(() => res(2), 1000)
    })
    promise.then(i => {
      console.log(i);
      return i + 2
    }).then(i => console.log(i));
    Promise.resolve(1).then(i => console.log(i));
  }

  static code () {
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
  }
}


// 10. generator to async
class Polyfill10 {
  
  static demo () {

    let getData = (val, time) => new Promise(res => setTimeout(() => res(val), time));

    async function fn () {
      const data1 = await getData(1, 500);
      console.log(`data1: ${data1}`);
      const data2 = await getData(2, 1000)
      console.log(`data2: ${data2}`)
      return 'success'
    }
    fn().then(i => console.log(i))
    
  }

  static code () {
    let getData = (val, time) => new Promise(res => setTimeout(() => res(val), time));
    function * genFn (val) {
      console.log(val)
      const data1 = yield getData(1, 500);
      console.log(`data1: ${data1}`);
      const data2 = yield getData(2, 1000)
      console.log(`data2: ${data2}`)
      return 'success'
    }
    function asyncToGen (genFn, ...arg) {
      return new Promise((res, rej) => {
        let fn = genFn(...arg);
        function step (type, arg) {
          let next;
          try {
            next = fn[type](arg);
          }
          catch(e) {
            rej(e)
          }
          const {value, done} = next;
          if (done) return res(value);
          Promise.resolve(value)
            .then(value =>  step('next', value))
            .catch(error => step('throw', error))
        }
        step('next');
      })
    }
    const gen = asyncToGen(genFn, 11);
    gen.then(i => console.log(i))
  }
}




// 11. Array reduce flat
class Polyfill11 {
  static code () {

    class MyArray {
      includes () {}

      reduce (fn, init) {
        // this.reduce((acc, cur, idx, arr) => {}, init)
        const arr = this;
        let i = 0;
        let acc = init
        if (init === undefined) {
          i = 1;
          acc = arr[0]
        }
        for (; i < arr.length; i++) {
          acc = fn(acc, cur, i, arr)
        }
        return acc
      }
    }
  }
}



