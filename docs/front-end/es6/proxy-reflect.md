

## Proxy

用于`拦截、自定义`对象的基本操作 

### API

*常见的拦截操作*
  - get：拦截属性读取操作
  - set：拦截属性设置操作
  - has：拦截 in 操作符
  - deleteProperty：拦截删除属性操作
  - apply：拦截函数调用操作
  - construct：拦截 new 操作符

*完整*
- get(target, propKey, receiver) 拦截对象属性的读取
  - 可继承原对象 `target[propKey]`
  - receiver 指向Proxy的实例
  - 可以被 configurable writable 所约束
- set(target, propKey, value, receiver) 拦截对象属性的设置
- has(target, propKey) 拦截 `propKey in proxy` 操作
- deleteProperty(target, propKey) 拦截 `delete proxy[key]` 操作
- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


### Proxy.revocable()

返回一个可取消的proxy实例， 用来收回代理权限 

  ```js
    let target = {};
    let handler = {};

    let {proxy, revoke} = Proxy.revocable(target, handler);

    proxy.foo = 123;
    proxy.foo // 123

    revoke();
    proxy.foo // TypeError: Revoked
  ```

### this

在 hanlder 函数内部， this 指向 handler 对象 

  ```js
    const handler = {
      get: function (target, key, receiver) {
        console.log(this === handler);
        return 'Hello, ' + key;
      },
      set: function (target, key, value) {
        console.log(this === handler);
        target[key] = value;
        return true;
      }
    };

    const proxy = new Proxy({}, handler);

    proxy.foo
    // true
    // Hello, foo

    proxy.foo = 1
    // true
  ```

有些原生对象的内部属性， 只有通过正确的 this 才能访问到 
  ```js
    const target = new Date('2015-01-01');
    const handler = {
      get(target, prop) {
        if (prop === 'getDate') {
          return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
      }
    };
    const proxy = new Proxy(target, handler);

    proxy.getDate() // 1
  ```



## Reflect

简化 合理 的对对象进行操作

*语言设计的目的*
1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上
2. 修改某些Object方法的返回结果，让其变得更合理
3. 让Object操作都变成函数行为
4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。



### API

api 与 Proxy 一一对应；
  - Reflect.apply(target, thisArg, args)
  - Reflect.construct(target, args)
  - Reflect.get(target, name, receiver)
  - Reflect.set(target, name, value, receiver)
  - Reflect.defineProperty(target, name, desc)
  - Reflect.deleteProperty(target, name)
  - Reflect.has(target, name)
  - Reflect.ownKeys(target)
  - Reflect.isExtensible(target)
  - Reflect.preventExtensions(target)
  - Reflect.getOwnPropertyDescriptor(target, name)
  - Reflect.getPrototypeOf(target)
  - Reflect.setPrototypeOf(target, prototype)

