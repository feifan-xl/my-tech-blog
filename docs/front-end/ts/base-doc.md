
## ts base document


### 基础类型

- boolean
- string
- number
- array
    - `let list: number[] = [1, 2, 3];`
    - `let list: Array<number> = [1, 2, 3];`
- tuple 元组 允许表示一个已知元素数量和类型的数组
    - `let x: [string, number];`
- enum 枚举
- any
- void
- null & undefined
- never 表示的是那些永不存在的值的类型
- Object
- unknown


### interface 

接口的作用: 对类型命名和检查？

- 可选属性
- 只读属性
- 函数类型
- 类类型
- 继承
    - 接口继承接口
    - 接口继承类

### class

- public 
- private 不能在声明它的类的外部访问
- protected 成员在派生类中仍然可以访问
- readonly 只读属性必须在声明时或构造函数里被初始化
- set/get
- static
- abstract class 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
- 可被当做接口使用


### function

- 重载


### 泛型

一种类型占位符，不需要预先指定具体类型, 而是在使用时指定


### 高级类型

- 交叉类型`&`
    - 混入 Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable
    - 泛型  `function extend<T, U>(first: T, second: U): T & U`
- 联合类型
    - `padding: string | number`
- 类型保护与区分类型
    - `(<Bird>pet).fly()`
    - `typeof`
    - `instanceof`


### symbol


### 模块解析

*解析策略*
- classic
    - 相对路径，相对于当前文件位置
        1. `moduleA.ts`
        2. `moduleA.d.ts`
    - 具体路径， 逐级上找
- node
    - 相对路径
       -  /root/src/moduleB.ts
       -  /root/src/moduleB.tsx
       -  /root/src/moduleB.d.ts
       -  /root/src/moduleB/package.json (如果指定了"types"属性)
       -  /root/src/moduleB/index.ts
       -  /root/src/moduleB/index.tsx
       -  /root/src/moduleB/index.d.ts

### 声明合并

- 接口合并
- 命名空间合并

### 三斜线
包含单个XML标签的单行注释
注释的内容会做为编译器指令使用  
放在文件最顶端  

编译器会对输入文件进行预处理来解析所有三斜线引用指令  在这个过程中，额外的文件会加到编译过程中。

如果指定了--noResolve编译选项，三斜线引用会被忽略


- `/// <reference path="..." /> `
    - 声明文件间的依赖关系
- `/// <reference types="..." />`
    - 声明了对某个包的依赖
- `/// <reference lib="" />`
    - 命令允许脚本文件显式包含内置 lib 库
- `/// <reference no-default-lib="true"/>`
    - 把文件标记为默认库, 通常在`.d.ts`中


### declare

声明 用来告诉编译器，某个类型是存在的，可以在当前文件中使用

`.d.ts` 文件, 用于声明类型




## problem

1. ts 好处
    - 面向对象编程。方便封装
    - 类型校验 避免部分错误 增加了代码可读性
2. interface & type
    - 定义： 描述数据结构， 描述类型
    - 仅能定义对象类型(属性 方法 索引等) 可定义任何类型(联合类型 交叉类型 字面量类型 原始类型等)
    - interface 可以被实现或继承，type不可
3. 泛型
    - 类型参数, 声明时不指定具体类型, 使类型更加灵活
4. 装饰器
    - 代码服用，使方法或者类得到增强 
5. 常见的工具类型
    - Partial<T>：将类型 T 的所有属性变为可选属性。
    - Required<T>：将类型 T 的所有属性变为必选属性。
    - Readonly<T>：将类型 T 的所有属性变为只读属性。
    - Record<K, T>：创建一个类型，其中属性名为类型 K 中的值，属性值为类型 T 中的值。
    - Pick<T, K>：从类型 T 中选择属性名为类型 K 中的属性，创建一个新类型。
    - Omit<T, K>：从类型 T 中排除属性名为类型 K 中的属性，创建一个新类型。
    - Exclude<T, U>：从类型 T 中排除类型 U 中的所有属性。
    - Extract<T, U>：从类型 T 中提取类型 U 中存在的所有属性。
    - NonNullable<T>：从类型 T 中移除 null 和 undefined。
    - ReturnType<T>：获取函数类型 T 的返回值类型。
6. unknown 不可预先定义的类型
    - 经常使用 `(a as unknown as string)`
    - 声明时 与 any 相视 `const foo: unknown = 'string';`
