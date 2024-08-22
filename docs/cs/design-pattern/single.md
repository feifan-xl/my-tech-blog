


## single

单例模式确保一个类只有一个实例，并提供一个全局访问点  

常用于管理全局状态

```
const Singleton = (() => {
  let instance = {};
  return () => instance;
})();

const instance1 = Singleton();
const instance2 = Singleton();

instance1 === instance2;
```