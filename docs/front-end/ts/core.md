
### base

1. 什么是ts
2. interface / type
  - interface 是对对象的抽象，定义了属性和方法， 方便多个地方共享， 可以被类 对象 函数实现
  - type 相当于起了一个别名，便于在多处使用，它可以用于原始值、联合类型、交叉类型等
3. 泛型 
  - 是一种在定义函数、类或接口时使用类型参数的方式，以增加代码的灵活性和重用性
4. 枚举和常量枚举？
  - 枚举可以包含计算得出的值，而常量枚举则在编译阶段被删除，并且不能包含计算得出的值，它只能包含常量成员。
  - 常量枚举在编译后会被删除，而普通枚举会生成真实的对象
5. 如何处理可空类型（nullable types）和undefined类型
  - 联合类型 Union Types `number | null`
6. 联合类型和交叉类型
  -  联合类型 一个值可以是多种类型中的一种 A | B 
  - 交叉类型表示一个新类型，它包含了多个类型的特性 `type C = A & B`
7. 类型声明文件 .d.ts
8. 命名空间（Namespace）和模块（Module）  
  - 模块提供了一种组织代码的方式，使得我们可以轻松地在多个文件中共享代码，
  - 命名空间则提供了一种在全局范围内组织代码的方式，防止命名冲突
9. 类型守卫（Type Guards） 用于在运行时检查类型的技术
10. 索引类型  创建具有动态属性名称的对象
  - 动态属性访问
  - 代码重用

11. const和readonly的区别
  - const主要用于声明常量值
  - readonly则用于标记类的属性使其只读
12. this
  - 在noImplicitThis为true 的情况下，必须声明 this 的类型，才能在函数或者对象中使用this
13. 泛型约束
  - extends 约束泛型参数的类型范围
  - keyof 限制泛型参数为某个对象的键
  - conditional types

保护类型
  - typeof
  - instanceof 通过构造函数来细化类型的一种方式

索引类型查询操作符 `keyof T`


### 关键字

#### typeof
- 一个 TS 类型定义，也就是type，JS data -> TS type
  ```ts
    const JPeople = {
      name: "张大炮",
      age: 18,
    };

    type Point =  { x: number; y: number };

    type d = typeof JPeople;

    const a:d = {
      name: '1',
      age: 1,
    }
  ```
- enum

#### keyof
- 将一个 类型 映射为其 所有成员名词的联合类型
  - type -> type（联合类型）
  - interface -> type（联合类型）
- 对于 非对象， 会返回其原型上所有key组成的一个联合类型

*keyof + typeof*
```ts
  // JS 对象
  const JsObject = {
    first: "第一个",
    second: 222,
  };

  // TS 枚举
  enum TS_ENUM {
    FIRST,
    SECOND,
  }

  type NameUnionOfObject = keyof typeof JsObject;
  // type NameUnionOfObject = "first" | "second"

  type NameUnionOfEnum = keyof typeof TS_ENUM;
  // type NameUnionOfObject = "FIRST" | "SECOND"

  const b: NameUnionOfObject = 'first'
  const c: NameUnionOfEnum = 'FIRST'
```


#### in 遍历枚举类型

  ```ts
    type TsTypeUnion = "first" | "second";

  // type TsTypeObject1 = { first: any, second: any }
  type TsTypeObject1 = {
    [P in TsTypeUnion]: any;
  };

  // type TsTypeObject2 = { first: "first", second: "second" }
  type TsTypeObject2 = {
    [P in TsTypeUnion]: P;
  };
  ```
in + keyof + typeof
```ts
  // JS 对象
  const JsObject = {
    name: "张大炮",
    age: 18,
  };

  // type TsTypeObject1 = { name: any; age: any; }
  type TsTypeObject1 = {
    [P in keyof typeof JsObject]: any;
  };

  /**
   * 等价于下面两种写法：
   * type TsTypeObject2 = { name: any; age: any; }
   * type TsTypeObject2 = typeof JsObject
   */
  type TsTypeObject2 = {
    [P in keyof typeof JsObject]: typeof JsObject[P];
  };

```

#### extends

使用场景:
1. 类型继承, 类型A去继承类型B
2. 定义泛型， 约束范型必须是与目标类型“匹配的”
```ts
  enum GENDER {
    MALE,
    FEMALE,
  }
  // 约束范型 G 必须是 GENDER 的子类
  interface IHuman<G extends GENDER> {
    gender: G;
    age: number;
  }
```
3. 条件匹配，判断类型 A 是否“匹配”类型 B
```ts
  type Subtraction<T, U> = T extends U ? never : T; // 找差集
  type Intersection<T, U> = T extends U ? T : never; // 找交集
```


extends + in + keyof
```ts
  type IObject = {
    a: string;
    b: number;
    c: boolean;
  };

  /**
   * 判断对象中 value 的类型，如果原类型是 string 则返回 string，否则返回 number
   * type TsType = { a: string; b: number; c: number; }
   */
  type TsType = {
    [P in keyof IObject]: IObject[P] extends string ? string : number;
  };

```
#### as

断言
转化

as + extends + in + keyof
  ```ts
    // 排除特定属性名
    // type OmitProp<T, R> = {
    //   [K in keyof T as K extends R ? never : K]: T[K];
    //   // [K in keyof T as (K extends R ? never : K)]: T[K];
    // };

    type OmitProp <T, R> = {
      [K in keyof T as K extends R ? never : K] : T[K]
    }

    // 排除特定属性值
    type OmitValue<T, R> = {
      // [K in keyof T as T[K] extends R ? never : K]: T[K];
      [K in keyof T as (T[K] extends R ? never : K)]: T[K];
    };

    type IOrigin = {
      a: string;
      b: boolean;
      c: number;
      d: string;
    };

    /**
     * 排除属性名的类型为 "c" | "d" 的属性
     * type IWithoutProp = { a: string; b: string; }
     */
    type IWithoutProp = OmitProp<IOrigin, "c" | "d">;

    /**
     * 排除属性值的类型为 string | boolean 的属性
     * type IWithoutValue = { c: number; }
     */
    type IWithoutValue = OmitValue<IOrigin, string | boolean>;
  ```
#### infer

用于获取 extends 推导过程中出现的某个类型
用来增强泛型

```ts
type GetLabelTypeFromObject<T> = T extends ? { label: infer R } ? R : never

type Result = GetLabelTypeFromObject<{ label: string }>;
// type Result = string

type GetFirstParamType<T> = T extends ? (...args: infer R) => any ? R[0] : never

```



### 内置

Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。
