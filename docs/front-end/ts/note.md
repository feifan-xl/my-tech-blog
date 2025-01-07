

1. type & interface
  - type 类型别名
    - 将函数 组合类型 工具类型等 抽离成一个单独完整的类型
    - 进行封装后复用
  - interface 接口: 描述对象、类的结构
    - 可被继承
2. enum & object
  - 对象是单向映射
  - 枚举是双向映射, 仅有值为数字的枚举才可以
    ```ts
      enum Items {
        Foo,
        Bar,
        Baz
      }
      const fooValue = Items.Foo; // 0
      const fooKey = Items[0]; // "Foo"
    ```
3. oop
  - public 类 实例 子类都可访问
  - private 类的内部访问
  - protected 类和子类中访问
  - static 不会被继承
4. solid
  - single 一个类只有一种职责
  - open 扩展开放 修改关闭
  - 里斯转换 派生类可以在程序的任何一处对基类进行替换
  - interface 接口分离 只实现直接需要的那部分
  - dependence 依赖倒置  
5. 断言
  - 非空断言 ！

### 类型工具

1. 联合类型和交叉类型 & |

2. 索引类型
code
```ts
  interface AllStringTypes {
    [key: string]: string;
  }
```
3. keyof 访问索引类型
```ts
  interface Foo {
    a: 1,
    599: 2
  }

  type FooKeys = keyof Foo; // "a" | 599
```
4. 映射类型
  - 基于键名映射到键值
```ts
  type Stringify<T> = {
    [K in keyof T]: string;
  };
```

5. typeof 类型查询
  - 用来查询类型
  - 可直接在类型标注时使用，也可以在工具类型中使用 

6. 类型守卫 is
  - is + 预期类型，类似断言，但是更宽容
  ```ts
    function isString(input: unknown): boolean {
      return typeof input === "string";
    }

    function isString(input: unknown): input is string {
      return typeof input === "string";
    }
  ```

7. 类型保护 in instanceof
  ```ts
    function handle(input: Foo | Bar) {
      if (input instanceof FooBase) {
      // if ('foo' in Foo) {
        input.fooOnly();
      } else {
        input.barOnly();
      }
    }
    ```
8. 类型断言守卫


### 泛型

1. 泛型默认值
2. 通过 extend 关键字约束泛型 
3. 多泛型关联
  ```ts
    type ProcessInput<
      Input,
      SecondInput extends Input = Input,
      ThirdInput extends Input = SecondInput
    > = number;
  ```
4. 内置泛型
  - promiseLike
    ```ts
      const a: () => PromiseLike<boolean> = function p () {
        return new Promise<boolean>((resolve, reject) => {
          resolve(true);
        });
      }
    ```
  - Array
    ```ts
      arr.reduce<number[]>((acc, curr) => ([...acc, curr]), []); // [1, 2, 3, 4, 5]
    ```

### 类型兼容

结构化类型: 基于完全的类型结构判断类型兼容性
  - 可通过设置非公开的额外属性避免(private/protected)
  ```ts
      class Cat {
      eat() { }
    }

    class Dog {
      eat() { }
    }

    function feedCat(cat: Cat) { }

    feedCat(new Dog())
  ```

标称类型系统: 
  - 两个类型结构名称相同， 可以同等使用 

> 关于 类型、类型系统、类型检查
  - 类型： 集合 -> 用来限制数据的 访问、赋值
  - 类型系统: 分配、实施 类型的规则
  - 类型检查: 确保类型遵循类型系统下的 类型兼容性 

### 类型层级

1.  关于 {} 与 object
  - ``` {} extend object ``` {} 意味着是object的字面量类型，类型信息层面
  - ``` object extend {}``` 结构化类型系统，空对象

2. 继承
  - extends
    - top extends -> bottom 
  - level
    - top: any unknown
    - 顶级原型: object
    - 装箱类型: String Boolean Number
    - 基础类型: string boolean number
    - 字面量: '1' true 1
    - bottom: never


### 条件类型 & infer

1. 条件类型
  - 三元表达式
    - extends ? a : b
    - extends infer 

2. 自动分发 
  ```ts
    type Tmp1 = any extends string ? 1 : 2; // 1 | 2
  ```

### 内置工具类型 

工具类型分类:
  - 属性修饰
    - 属性修饰
      - partial
      - required
      - readonly
    - 映射类型
    - 索引类型 
  - 结构工具
    - 结构声明
      - Record
        ```ts
          type Record<K extends keyof any, T> = {
              [P in K]: T;
          };
        ```
    - 结构处理
      - Pick
        ```ts
          type Pick<T, K extends keyof T> = {
              [P in K]: T[P];
          };
        ```
      - Omit
  - 集合工具
     - ```type Extract<T, U> = T extends U ? T : never;```
     - ```type Exclude<T, U> = T extends U ? never : T;```
  - 模式匹配工具
  - 模板字符串工具

### 协变和逆变

对于函数:
  - 协变: 参数类型 允许 为父类， 不允许 子类
  - 逆变: 返回值 允许 子类， 不允许 父类 



### 模板字符串


1. 结合 infer 使用 
```ts
  type ReverseName<Str extends string> =
    Str extends `${infer First} ${infer Last}` ? `${Capitalize<Last>} ${First}` : Str;
```


### 工程化


1. 类型声明
  - declare
2. 扩展已有的类型定义
  - ```interface Window {}```
3. 三斜线: 声明当前文件依赖的其他类型声明
 必须放在文件的顶部
4. namespace
  ```ts
      export namespace VirtualCurrency {
        export class QQCoinPaySDK {}

        export class BitCoinPaySDK {}

        export class ETHPaySDK {}
      }
    ```


### 编译

编译流程:
Parser：解析 TypeScript 源文件，生成 AST。
Binder：为 AST 中的标识符绑定作用域。
Checker：检查类型是否正确。
Emitter：将 AST 转换为目标 JavaScript 代码。
Watch Mode：监听文件变化，自动重新编译（增量编译）。



