
## catalog

### 1. call


### 2. apply


### 3. bind


### 4. instanceof
检测构造函数的 原型对象 是否在 某个实例的原型链上  
Object.getPrototypeOf(left) === right.prototype

### 5. object.create
创建空对象 并绑定原型

### 6. promise
注意点:
1. then 的链式调用&值穿透特性，主要promiseResolution
2. promiseResolution，返回
    - promise 对象 pending 执行then方法, 其他状态直接返回
    - 引用对象 需要执行 then 方法
    - 基本对象 直接返回


### 7. new


### 8. deepclone shollowClone


### 9. es5 继承


### 10. 二分查找


### 11. quick sorting


### 12. bubble sort


### 13. select sort


### 14. ajax xhr


### 15. 订阅发布


### 16. fibonacci


### 17. 去重


### 18. debounce 防抖


### 19. throttle 节流


### 20. 类型判断


### 21. flatten


### 22. currying


### 23. async / await


### 24. list to tree


```js

const list = [
    { pid: null, id: 1, data: "1" },
    { pid: 1, id: 2, data: "2-1" },
    { pid: 1, id: 3, data: "2-2" },
    { pid: 2, id: 4, data: "3-1" },
    { pid: 3, id: 5, data: "3-2" },
    { pid: 4, id: 6, data: "4-1" },
  ];

function listToTree (list) {
    const map = {}
    const res = []
    list.forEach(i => {
        map[i.id] = i
        i.children = []
    })

    list.forEach(i => {
        if (i.pid === null) {
            res.push(i)
        } else {
            map[i.pid].children.push(i)
        }
    })
    return res
}
```

### 25. compose

### 26. reduce

## demo

```js
// 目录
// 1. call
// 2. apply
// 3. bind
// 4. instanceof
// 5. object.create
// 6. promise all race resolve reject finally catch
// 7. new
// 8. deepclone shollowClone
// 9. 继承 es5 & es6
// 10. 二分查找
// 11. quick sorting
// 12. bubble sort
// 13. select sort
// 14. ajax xhr
// 15. 订阅发布
// 16. fibonacci
// 17. 去重
// 18. debounce 防抖
// 19. throttle 节流
// 20. 类型判断
// 21. flatten
// 22. currying
// 23. async / await
// 24. list to tree
// 25. compose
// 26. reduce

// 1. call

fn.call(this, arg1, arg2)
obj.myCall(this, ...args)

obj.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') throw Error()
    const fn = Symbol('fn')
    context = context || window
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
}

// 2. apply
fn.apply(this, [...args])
fn.prototype.myApply = function (context, params = []) {
    if (typeof this !== 'function') throw new Error()
    context = context || window
    let fn = Symbol('fn')
    context[fn] = this
    let res = context[fn](...params)
    delete context[fn]
    return res
}

// 3. bind
f = fn.bind(this, ...arg1)
f(...arg2)
fn.prototype.bind = function (context, ...arg1) {
    context = context | window
    const fn = this
    return function (...arg2) {
        return fn.apply(context, [...arg1, ...arg2])
    }
}

// 4. instanceof
// 检测构造函数的 原型对象 是否在 某个实例的原型链上
a instanceof // -> boolean

function isInstanceof (left, right) {
    let l = Object.getPrototypeOf(left)
    let r = right.prototype
    while (true) {
        if (l === null) return false
        if (l === r) return true
        l = Object.getPrototypeOf(l)
    }
}

// 5. Object.create
Object.create(prototypeObj)

function create (prototypeObj) {
    function F() {}
    F.prototype = prototypeObj
    return new F()
}



// 6. promise

// 
a = new Promise((res, res) => {
    res(11)
})
a.then(() => {}, () => {})

function Promise (exector) {
    let state = 'pending'
    let slef = this
    this.value = null
    this.reason = null
    this.onFulfilledList = []
    this.onRejectedList = []
    function resolve (value) {
        if (this.state === 'pending') {
            slef.value = value
            this.state = 'fulfilled'
            this.onFulfilled.forEach(i => {
                i.call(self, value)
            })
        }
    }

    function reject (reason) {
        if (this.state === 'pending') {
            this.state = 'rejected'
            slef.reason = reason
        }
    }
    try {
        exector(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    let promise2 = new Promise(function (resolve, reject) {
        if (self.state === 'fulfilled') {
            if (typeof onFulfilled === 'function') {
                const x = onFulfilled(promise1Value) 
                promiseResolution(promise2, x, resolve, reject)
            } else {
                resolve(promise1Value)
            }
        } else if (self.state === 'rejected') {

        } else if (self.state === 'pending') {
            self.onFulfilledList.push(function (promise1Value) {
                if (typeof onFulfilled === 'function') {
                    try {
                        const x = onFulfilled(promise1Value) 
                        promiseResolution(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    resolve(promise1Value)
                }
            })
            self.onRejectedList.push(function (promise1Reason) {
                if (typeof onRejected === 'function') {
                    try {
                        const x = onRejected(promise1Reason)
                        promiseResolution(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                } else {
                    reject(promise1Reason)
                }
            })
        }
    })
    return promise2
}
function promiseResolution (promise2, x, resolve, reject) {
    if (promise2 === x) return new Error()
    if (x instanceof Promise) {
        if (x.state === 'pending') {
            x.then(function (y) {
                promiseResolution(promise2, y, resolve, reject)
            }, reject)
        } else if (x.state === 'fulfilled') {
            resolve(x.value)
        } else if (x.state === 'rejected') {
            reject(x.value)
        }
    }
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        
        try {
            let then = x.then
            if (typeof then === 'function ') {
                then.call(
                    x,
                    function resolvePromise (y) {
                        return promiseResolution(promise2, y,resolve, reject)
                    },
                    function rejectePromise (e) {
                        return reject(e)
                    }
                )
            } else {
                resolve(x)
            }
        }catch(e) {
            reject(e)
        }
    } else {
        resolve(x)
    }
    
}

Promise.all = function (promiseList) {
    let count = 0
    let result = []
    return new Promise((resolve, reject) => {
        promiseList.forEach((i, index) => {
            Promise.resolve(i).then(res => {
                result[index] = res
                count++
                if (count === promiseList.length) {
                    resolve(result)
                }
            }, reject)
        })
    })
}

Promise.race = function (promiseList) {
    return new Promise((resolve, reject) =>{
        promiseList.forEach(i => {
            Promise.resolve(i).then(resolve, reject)
        })
    })
}

Promise.any = function (promiseList) {
    return new Promise((resolve, reject) => {
        promiseList.forEach(i => {
            Promise.resolve(i).then(resolve)
        })
    })
}


// 7. new 
// 创建空对象 绑定this 绑定原型 返回对象或者this
fn = new Fn()

function newObj (target, ...args) {
    const obj = Object.create(target.prototype)
    let res = target.call(obj, ...args)
    return (typeof res != 'object' && res != null) ? res : obj
}



// 8. deepclone shollowClone

function deepClone (origin, map = new Map()) {
    
    if (Object.prototype.toString(origin) !== '[Object object]' && 
    Object.prototype.toString(origin) !== '[Object Array]') {
        return origin
    }
    if (map.has(origin)) {
        return map.get(origin)
    }
    let target = Array.isArray(origin) ?  [] : {}
    for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'object' && origin[key] !== null) {
                target[key] = deepClone(origin[key])
            } else {
                target[key] = origin[key]
            }
        }
    }
    map.set(origin, target)
    return target
}

// 9. 继承 es5 & es6

function Animal (name) {
    this.name = name
}
Animal.prototype.sleep = function () {}


function Cat (name) {
   Animal.call(this, name) 
}
Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
Cat.prototype.cat = function () {}

// (function () {
//     let Super = function () {}
//     Super.prototype = Animal.prototype
//     Cat.prototype = new Super()
// })()
function Animal (name) {
    this.name = name
}
Animal.prototype.cat = function () {console.log(22)}
Animal.ca = function () {console.log('222')}
class Dog extends Animal {
    constructor (name) {
        super(name)
        this.aa
    }
    sle () {
        // 父类原型属性
        super.cat()
    }
    static method () {
        // 父类
        super.ca()
    }
}
dog = new Dog(22)
dog.sle()
Dog.method()


// 10. 二分查找

function binarySearch(arr, value) {
    if (arr.length === 0) return -1
    let start = 0, end = arr.length -1;
    while (start <= end) {
        const mid = Math.floor((end + start) / 2)
        if (arr[mid] < value) {
            start = mid + 1
        } else if (arr[mid] > value) {
            end = mid - 1
        } else if (arr[mid] === value) {
            return mid
        }
    }
    return -1
}

// 11. quick sorting

function quickSorting (arr) {
    if (arr.length <= 1) return arr
    let m = Math.floor(arr.length / 2)
    let left = [], right = [], mid = []
    for (let i = 0; i < arr.length ; i++) {
        if (arr[i] < arr[m]) {
            left.push(arr[i])
        } else if (arr[i] > arr[m]) {
            right.push(arr[i])
        } else if (arr[i] === arr[m]) {
            mid.push(arr[i])
        }
    }
    return [...quickSorting(left), ...mid, ...quickSorting(right)]
}

quickSorting([51,3,7,824,5,6,8,9])

// 12. bubble sort

function BubbleSort (arr) {
    for (let i = 0; i < arr.length;i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}

// 13. select sort

function SelectSort (arr) {
    let len = arr.length;
    let minIndex
    for (let i = 0; i <len; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            swap(arr, i, minIndex)
        }
    }
    return arr
}


// 14. ajax xhr

// 15. 订阅发布
// register(type, fn)
// dispatchEvent(type)
// remove(type, fn)

let Observer = function () {

    this.msg = {}
    this.register = function (type, fn) {
        if (this.msg[type]) {
            this.msg[type].push(fn)
        } else {
            this.msg[type] = [fn]
        }
    }
    this.dispatchEvent = function (type, ...args) {
        if (this.msg[type]) {
            this.msg.forEach(i => {
                i.call(i, ...args)
            })
        }

    }
    this.remove = function (type, fn) {
        if (!msg[type] instanceof Array) {
          let len = _msg[type].length - 1
          for (let i = len; i >=0; i--) {
            msg[type][i] === fn && msg[type].splice(i, 1)
          }
        }
    }
}


// 16. fibonacci
// 1 1 2 3 5 8
function fibonacci (n) {
    if (n === 1 || n === 1) return 1
    let d_1 = 1, d_2 = 1
    for (let i = 3; i <= n; i++) {
        const tmp = d_1 + d_2
        d_1 = d_2
        d_2 = tmp
    }
    return d_2
}
fibonacci(6)


// 17. 去重

let questStep = arr => [...new Set(arr)]


// 18. debounce 防抖
// a = debounce(fn, 100)
// a(22)

function debounce (fn, time) {
    let timer
    return function (...args) {
        let context = this
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(context, ...args)
            timer = null
        }, time)
    }
}

// 19. throttle 节流
// a = throttle(fn, 400)
// a(1)

function throttle (fn, time) {
    let timer
    return function (...args) {
        const context = this
        if (timer) return
        timer = setTimeout(() => {
            fn.call(context, ...args)
        }, time)
    }
}


// 20. 类型判断


// 21. flatten

var arr = [1, [2, [3, 4]]];

function flat (arr) {
    return arr.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat(cur)) :acc.concat(cur) , [])
}
flat(arr)


// 22. currying

function currying (fn, ...args) {
    return function (...arg2) {
       return fn.call(fn, ...args, ...arg2)
    }
}

function multiFn(a, b, c) {
    return a * b * c;
  }
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);

function curry (fn, ...arg1) {
    return function (...arg) {
        if ([...arg1, ...arg].length < fn.length) {
            return curry.call(fn, fn, ...arg1, ...arg)
        } else {
            return fn.call(fn, ...arg1, ...arg)
        }
    }
}

add(1)(2)(3) == 6
add(2,4)(1) == 7
// toString
function add (...arg1) {
    let arg = [...arg1]
    function _add (...arg2) {
        return add(...arg1, ...arg2)
    }
    _add.toString = function () {
        return arg1.reduce((acc, cur) => acc + cur, 0)
    }
    return _add
}

// 23. async / await

    // function* f() {
    // for(var i = 0; true; i++) {
    //     var reset = yield i;
    //     if(reset) { i = -1; }
    // }
    // }

    // var g = f();

    // g.next() // { value: 0, done: false }
    // g.next() // { value: 1, done: false }
    // g.next(true) // { value: 0, done: false }

function run (genF) {
    return new Promise((resolve, reject) => {
        const gen = genF()
        function step (genNext) {
            let next 
            try {
                next = genNext()
            } catch (e) {
                reject(e)
            }
            if (next.done) return resolve(next.value)
            Promise.resolve(next.value).then(res => {
                step(() => gen.next(res))
            }, e => step(() => gen.throw(e)))
        }
        step(() => gen.next(undefined))
    })
}

// 24. list to tree
const list = [
    { pid: null, id: 1, data: "1" },
    { pid: 1, id: 2, data: "2-1" },
    { pid: 1, id: 3, data: "2-2" },
    { pid: 2, id: 4, data: "3-1" },
    { pid: 3, id: 5, data: "3-2" },
    { pid: 4, id: 6, data: "4-1" },
  ];

function listToTree (list) {
    const map = {}
    const res = []
    list.forEach(i => {
        map[i.id] = i
        i.children = []
    })

    list.forEach(i => {
        if (i.pid === null) {
            res.push(i)
        } else {
            map[i.pid].children.push(i)
        }
    })
    return res
}

// 25. compose

function fn1 (a) { return a + 1}
function fn2 (a) { return a + 2}
a = compose(fn1, fn2)
a(1)

function compose(...fns) {
    return function (...args) {
        return fns.reduce((acc, cur) => cur(acc), ...args)
    }
}

// 26. reduce
[].reduce((acc, cur, idx, ori) => {}, i)

Array.prototype.myReduce = function (fn, init) {
    let i = 0
    if (init === undefined) {
        init = this[0]
        i = 0
    }
    let result = init
    for (; i < this.length; i++) {
        result = fn(result, this[i], i, this)
    }
}

```