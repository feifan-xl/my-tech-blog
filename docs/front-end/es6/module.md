


## ESM


静态加载，即编译时加载

### VS CommonJS

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
  - 输出的是值的拷贝, 对于基本类型的输出 一旦输出就不会改变(更多的像是传参过程中入参的形式)
  - 值的引用, import 会生成一个只读引用， 并是不是赋值
- CommonJS 模块是运行时加载， ES6 模块是编译时输出接口()
- CommonJS 模块的require()是同步加载模块有缓存，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段
- CommonJS 支持动态导入, 也就是 require(`${path}/xx.js`)


### export & import

`export` 输出的接口, 与其对应的值是动态绑定的，即通过该接口，可以取到模块内部实时的值

```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 300)
```

`import`  变量提升, 生成一个只读引用, 并不是赋值
```
import {a} from 'xx.js'
a.foo = 'bar'
```

### import()

ES2020 提案引入 import() 函数，支持动态加载模块 
- 按需加载
- 条件加载
- 动态模块路径

语法:
```
if (conditon) {
  import('moduleA').then((module) => { module.default})
}
else {
  import(f()).then((export1, export2) => {})
}
async function main () {
  const mo = await import('.module.js')
}
```

### import.meta

ES2020 添加， 返回元信息 
- import.meta.url
- import.meta.scriptElement

## ESM 加载实现 


### 浏览器加载


#### async/defer

渲染完执行/下载完执行:
- 相同: 异步加载脚本 
- 区别:
  - defer 等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行
  - async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染
```
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

#### type

```
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

### esm commonjs 相互加载

`commonjs 加载 esm`  
```
  (async () => {
    await import('./my-app.mjs');
  })();
```

`esm加载commonjs`
```
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```


### 循环加载 

#### commonjs

在第一次加载该脚本时，会执行整个脚本， 并在内存中生成一个对象 
以后再使用时， 直接加载此对象 
遇到循环引用时，返回当前已经加载的部分 

```
  {
    id: '',
    export: {},
    loaded: true,
    ...
  }
```

#### esm

相同， 会有变量提升 

```
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}

```