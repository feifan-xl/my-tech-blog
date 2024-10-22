


### key word

*keyof* 获取某个类型的键集合 它接受一个对象类型作为参数，并返回该对象所有 key 值组成的联合类型
```ts
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

*is* 类型守卫 细化和确认变量的类型
*as* 类型断言 
*in* 检查对象是否具有某个属性

*infer* 在条件类型中推断类型


### 概念

*分发* 当条件类型遇到联合类型时，它会自动将联合类型中的每个成员逐一传递给条件类型进行判断和处理
  ```ts
    type TypeA = string | number | boolean | symbol;

    type MyExclude<T, K> = T extends K ? never : T;

    // ExcludeSymbolType 类型为 string | number | boolean，排除了symbol类型
    type ExcludeSymbolType = MyExclude<TypeA, symbol | boolean>;
  ```
*循环*
  ```ts
    interface IInfo {
      name: string;
      age: number;
    }
    type MyPartial<T> = { [K in keyof T]?: T[K] };
    type OptionalInfo = MyPartial<IInfo>;
  ```

*逆变* 参参数少的可以赋给参数多的
  ```ts
  let fn1!: (a: string, b: number) => void;
  let fn2!: (a: string, b: number, c: boolean) => void;
  fn2 = fn1; // 正确，被允许
  ```

*协变* 如果类型 A 是类型 B 的子类型，那么使用 A 的位置也可以使用 B


### 内置类型

*Exclude* 排除
  ```ts
    type TypeA = string | number | boolean | symbol;
    // ExcludeSymbolType 类型为 string | number | boolean，排除了symbol类型
    type ExcludeSymbolType = Exclude<TypeA, symbol>;
  ```

*Partial* 将对象的属性编程可选项 
  ```ts
    interface IInfo {
      name: string;
      age: number;
      school: {
        middleSchool: string;
        highSchool: string;
        university: string;
      }
    }

    type OptionalInfo = Partial<IInfo>;
  ```