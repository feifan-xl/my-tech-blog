// 目录
// 01. Object.assign
// 02. deep clone & shadow clone
// 03. inheritance
// 04. apply bind call
// 05. new 
// 06. currying
// 07. onion
// 08. promise
// 09. generator to async
// 10. list and tree
// 11. object create & assign
// 12. debounce & throttle
// 13. Array

// 01. object.assign
  // k1: source 为数组
  // k2: Object.keys()
  // k3: getOwnPropertySymbols and enumerable
  function completeAssgin(target, ...source) {
    source.forEach(i => {
      const descriptors = Object.keys(i).reduce((acc, cur) => {
        acc[cur] = Object.getOwnPropertyDescriptor(i, keys)
        return acc;
      }, {})

      Object.getOwnPropertySymbols(i).forEach(sym => {
        const descriptor = Object.getOwnPropertyDescriptor(i, sym)
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor
        }
      })
      Object.defineProperties(target, descriptors);
    })
    return target;
  }


// 02. deep clone & shadow clone

  function deepClone (obj, map = new WeakMap()) {
    
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    if (map.has(obj)) {
      return map.get(obj)
    }
    let res = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = deepClone(obj[key])
      }
    }
    map.set(obj, res)
    return res;
  }


// 03. inheritance
  function Polyfill03 () {

    function Animal () {}
    function Cat() {}
  
    // 03-01 原型继承
    function Cat () {}
    Cat.prototype = new Animal();
  
    // 03-02 构造函数
    function Cat () {
      Animal.call(this)
    }
    cat = new Cat();

    // 03-03 组合寄生
    function Cat() {
      Animal.call(this)
    }
    // Cat.prototype = Object.create(Animal.prototype)
    // Cat.prototype.constructor = Cat
    (function () {
      let Super = function () {}
      Super.prototype = Animal.prototype
      Cat.prototype = new Super();
      Cat.prototype.constructor = Cat
    })();
  
    // 03-04 class
    class Cat extends Animal {
      constructor() {
        super();
      }
      methods () { }
    }
  
  }



// 04. apply bind call

  // 04.01 apply
  fn.apply(this, [...a])
  obj.prototype.myApply = function (context, params = []) {
    if (typeof this !== 'function') throw new Error()
    context = context || globalThis;
    const fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...params)
    // delete context[fn];
    Reflect.deleteProperty(context, fn)
    return res;
  }

  // 04.02 call
  fn.call(this, a, b, c)
  Function.prototype.myCall = function(context, ...params) {
    if (typeof this !== 'function') throw new Error()
    context = context || globalThis;
    const fn = Symbol();
    context[fn] = this;
    let res = context[fn](...params);
    Reflect.deleteProperty(context, fn);
    return res;
  }

  // 04.03 bind
  fn.bind(this, a, b)(c)
  a = fn.bind(this, a,b)
  b = new a();

  Function.prototype.bind = function (context, ...arg1) {
    context = context || globalThis;
    const fn = this;
    function boundFunction (...arg2) {
      if (this instanceof boundFunction) {
        return new fn(...arg1, ...arg2)
      }
      return fn.apply(context, [...arg1, ...arg2]);
    }
    boundFunction.prototype = fn.prototype
    return boundFunction;
  }

// 05. new 
  // 1. create new object and bind prototype
  // 2. bind this
  // 3. return new object
  a = new Fn(...args)
  function newObject (constructorFn, ...args) {
    // const obj = {};
    // obj.prototype = constructorFn.prototype
    const obj = Object.create(constructorFn.prototype)
    let res = constructorFn.call(obj, ...args)
    return (typeof res === 'object' && res != null)
      ? res
      : obj
  }


// 06. currying

  // 06.01 common currying
  function currying (fn, ...arg1) {
    return function (...arg2) {
      return fn.call(fn, ...arg1, ...arg2)
    }
  }

  // 06.02 toString
  add(1)(2)(5) == 10;
  function add (...arg1) {
    let arg = [...arg1]
    let _add = function (...arg2) {
      arg = [...arg, ...arg2]
      return _add
    }
    _add.toString = function () {
      return arg.reduce((a, b) => a * b, 1)
    }
    return _add;
  }

  // 06.03 toString + function.length
  const multiFn = (a, b, c, d) => a * b * c * d
  const multi = curry(multiFn)
  multi(1)
  multi(12)
  multi(13)
  multi(14)

  function curry (fn, ...arg1) {
    let arg = [...arg1]
    const res = function (...arg2) {
      arg =[...arg, ...arg2]
      if (arg.length == fn.length) {
        return fn.call(fn, ...arg)
      }
      else {
        return res
      }
    }
    return res
  }
  
  // 06.04 compose
  function compose (...fns) {
    return function (arg) {
      return fns.reduce((res, fn) => {
        return fn.call(fn, res)
      }, arg)
    }
  }
  const composeSi =(...fns)=>
     arg =>
       fns.reduce((res, fn) => fn.call(fn, res), arg)
  
  let add3 = x => x + 3;
  let mul2 = x => x * 2;
  composeSi(mul2, add3)(2);// -> 7

// 07. onion

  function Polyfill07 () {
    class Onion {
      constructor () {
        this.middlewares = [];
      }
      use (middleware) {this.middlewares.push(middleware)}

      async execute(ctx) {
        let len = this.middlewares.length;
        const execute = async idx => {
          if (idx < len) {
            await this.middlewares[idx](ctx, () => execute(idx + 1))
          }
        }
        await execute(0)
      }
    }
    const middleware1 = async (ctx, next) => {
      console.log('m1 start')
      ctx.value += 1;
      await new Promise(res => setTimeout(res(2), 1000))
      await next();
      console.log('m1 end')
    }
    const middleware2 = async (ctx, next) => {
      console.log('m2 start')
      ctx.value += 1;
      next();
      console.log('m2 end')
    }
    const middleware3 = async (ctx, next) => {
      console.log('m3 start')
      ctx.value += 1;
      next();
      console.log('m3 end')
    }
  
    const onion = new Onion();
    onion.use(middleware1)
    onion.use(middleware2)
    onion.use(middleware3)
  
    const ctx = { value: 0 }
    onion.execute(ctx).then(() => {
      console.log(ctx, 'final')
    })
  }

// 08. promise

  class MyPromise {
    static P = 'pending';
    static F = 'fulifilled';
    static R = 'rejected';

    constructor (executor) {
      this.state = MyPromise.P;
      this.value = undefined;
      this.error = undefined;
      this.fulifilledCb = [];
      this.rejectedCb = [];

      const resolve = value => {
        if (this.state === MyPromise.P) {
          this.state = MyPromise.F;
          this.value = value;
          this.fulifilledCb.forEach(cb => cb(value))
        }
      }

      const reject = error => {
        if (this.state === MyPromise.P) {
          this.state = MyPromise.R
          this.error = error;
          this.rejectedCb.forEach(cb => cb(error))
        }
      }
      try {
        executor(resolve, reject)
      } catch (e) {
        reject(e)
      }
    }
    
    then (onFulfilled, onRejected) {
      let promise2 = new MyPromise((resolve, reject) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : i => i;
        onRejected = typeof onRejected === 'function' ? onRejected : error => new Error(error)

        const handleResolve = () => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              // resolve(x)
              MyPromise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        };
        const handleRejected = () => {
          try {
            const x = onRejected(this.error)
            MyPromise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        };

        if (this.state === MyPromise.F) {
          handleResolve();
        }
        else if (this.state === MyPromise.R) {
          handleRejected();
        }
        else {
          this.fulifilledCb.push(handleResolve);
          this.rejectedCb.push(handleRejected);
        }
      })
      return promise2
    }

    static resolvePromise (promise2, x, resolve, reject) {
      if (x === promise2) return new Error('circle')
      let called = false
      if ((typeof x === 'object' || typeof x === 'object') && x !== null) {
        try {
          let then = x.then;
          if (typeof then === 'function') {
            then.call(
              x,
              value => {
                if (called) return;
                called = true
                resolve(value)
              },
              error => {
                if (called) return;
                called = true
                reject(error)
              },
            )
          }
          else {
            if (called) return;
            called = true
            resolve(x)
          }
        }
        catch (e) {
          if (called) return;
          called = true
          reject(e)
        }
      }
      else {
        if (called) return;
        called = true
        resolve(x)
      }
    }

    static all (promiseList) {
      if (!promiseList[Symbol.iterator]) {
        return reject(new TypeError(' object is not iterable'))
      }
      return new MyPromise((resolve, reject) => {
        let len = promiseList.length;
        if (len === 0) return resolve([])
        let resultCounter = 0;
        let result = Array(len)
        for (let i = 0; i < len; i++) {
          Promise.resolve(promiseList[i])
            .then(res => {
              result[i] = res;
              resultCounter++;
              if (resultCounter == len) {
                resolve(result)
              }
            })
            .catch(e => reject(e))
        }
      })
    }

    static race (promiseList) {
      return new MyPromise((resolve, reject) => {
        if (!promiseList[Symbol.iterator]) {
          return reject(new TypeError(' object is not iterable'))
        }
        for (const promise of promiseList) {
          MyPromise.resolve(promise)
            .then(resolve)
            .catch(reject)
        }
      })
    }

    static resolve (i) {
      return new MyPromise(resolve => {
        resolve(i)
      })
    }

    static reject (i) {
      return new MyPromise((_, reject) => {
        reject(i)
      })
    }
    
    static allSettled (promises) {
      return new MyPromise((resolve, reject) => {
        if (!promises[Symbol.iterator]) {
          return reject(new TypeError('can not iterator'))
        }
        let counter = 0;
        let len = promises.length;
        let result = Array(len)
        for (let i = 0; i < len; i++) {
          Promise.resolve(promises[i])
            .then(res => {
              result[i] = {
                status: MyPromise.F,
                value: res,
              }
              counter++;
              if (counter === len) {
                resolve(result)
              }
            })
            .catch(e => {
              result[i] = {
                status: MyPromise.R,
                reason: e,
              }
              counter++;
              if (counter === len) {
                resolve(result)
              }
            })
        }
      })
    }
  }

  const promise = new MyPromise((res, rej) => {
    setTimeout(() => res('success'), 1000)
    // res('111')
  })

  promise.then(value => {
    console.log(value);
    return value + ' then cb'
  }).then(i => console.log(i))
  Promise.resolve(2).then(i => console.log(222))


// 09. generator to async
  function Polyfill09 () {

    const getData1 = () => new Promise(res => setTimeout(() => res(1), 1000));
    const getData2 = () => new Promise(res => setTimeout(() => res(2), 1000));
    
    function* testG () {
      const data1 = yield getData1();
      console.log('data1', data1);
      const data2 = yield getData2();
      console.log('data2', data2)
      return 'success';
    }
    
    const gen = asyncToGen(testG)
    gen.then(i => console.log(i))

    function asyncToGen (genFn) {
      return new Promise((resolve, reject) => {
        let gen = genFn();
        function step(type, arg) {
          let next;
          try {
            next = gen[type](arg);
          } catch(e) {
            reject(e)
          }
          if (next.done) return resolve(next.value);
          // 通过包装返回值， 获取promose.reoslve的值
          Promise.resolve(next.value)
            .then(res => step('next', res))
            .catch(err => step('throw', err))
        }
        step('next')
      })
    }
  }


// 10. list and tree
  function Polyfill10 () {
    const list = [
      { pid: 2, id: 4, data: "3-1" },
      { pid: 1, id: 2, data: "2-1" },
      { pid: null, id: 1, data: "1" },
      { pid: 1, id: 3, data: "2-2" },
      { pid: 3, id: 5, data: "3-2" },
      { pid: 4, id: 6, data: "4-1" },
    ]

    const listToTree = list => {
      let map = {};
      let res = [];
      list.forEach(i => {
        map[i.id] = i;
        i.children = []
      })
      list.forEach(i => {
        if (i.pid == null) {
          res.push(i)
        }
        else {
          map[i.pid].children.push(i)
        }
      })
      return res
    }
    const TreeToList = tree => {
      let res = [];
      let tmp = tree;
      while (tmp.length > 0) {
        const item = tmp.shift();
        if (item.children) {
          tmp.push(...item.children)
        }
        delete item.children
        res.push(item)
      }
      return res
    }
    const tree = listToTree(list)
    const list1 = TreeToList(tree);
  }

// 11. Object 
  class MyObject {
    constructor () {}

    static create (proto, propotiesObject) {
      if (typeof proto !== 'object' && typeof proto != 'function') {
        throw new TypeError('Object prototype only be an object')
      }
      function F () {};
      F.prototype = proto
      const res = new F();
      if (propotiesObject) {
        Object.defineProperties(res, propotiesObject)
      }
      return res;
    }

    static assign (target, ...source) {
      if (target === null || target === undefined) {
        throw new TypeError('')
      }
      const res = Object(target);
      source.forEach(i => {
        if (i !== null && i !== undefined) {
          for (let key in i) {
            if (Object.hasOwnProperty.call(i, key)) {
              res[key] = i[key]
            }
          }
        }
      })
      return res;
    }
  }

// 12. debounce & throttle
  function Polyfill12 () {
    const fn = (i) => console.log(1, i);
    // debounce 防抖 ns内重新计时
    function debounce (fn, time) {
      let timer
      return function (...arg) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.call(fn, ...arg)
          timer = null
        }, time)
      }
    }
    a = debounce(fn, 100);
    a(11);
    setTimeout(() => a(22), 200)
    a(11);


    // throttle 节流 ns后再执行
    function throlle (fn, time) {
      let timer;
      return function (...arg) {
        if (timer) return 
        timer = setTimeout(() => {
          fn.call(fn, ...arg)
          timer = null
        }, 2000)
      }
    }
  }

// 13. Array
  class MyArray {
    constructor () {}

    inclueds (ele) { }

    reduce (fn, init ) {
      const arr = this;
      let i = 0;
      let acc = init;
      if (acc === undefined) {
        acc = arr[0];
        i = 1;
      }
      // fn((acc, cur, idx, arr) => {}, init)
      for (; i < arr.length; i++) {
        acc = fn.call(fn, acc, arr[i], i, arr)
      }
      return acc;
    }

    static flat () {}
  }