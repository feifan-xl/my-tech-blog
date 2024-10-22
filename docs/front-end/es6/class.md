
## class

特性:
  1. 不存在变量提升 hoist
  2. name 属性
  3. 实例可添加 generator 方法
  4. this 默认指向类的实例， 可被 bing、解构等影响



### 继承
*demo*
  ```js
    class Dog extends Animal {
        constructor (name) {
            super(name)
        }
    }
  ```
- 子类的 `__proto__` 属性 表示构造的继承，总是指向父类
- 子类prototype属性的`__proto__`属性，表示方法的继承，总是指向父类的prototype属性

*demo2*
  ```js
    class A {
    }

    class B extends A {
    }

    B.__proto__ === A // true
    B.prototype.__proto__ === A.prototype // true
  ```

### super

1. 作为*函数调用*, 代表父类的构造函数, 作用是形成子类的this对象,  把父类的实例属性和方法放到这个this对象上面, 在 super()前, 是没有this对象的

2. 作为*对象*时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。


### static & private

static 静态, 表示为 class 自身的  
  - 可被继承
  - 直接访问  

\# 私有 
   - 不可在外部访问
   - 可 通过 setter getter 
   - 可以被 in 访问 ``` #a in obj```


   


```js
class Foo {
    constructor (name) {
        this.name = name
    }
    m1 () {
      console.log('m1')
    }
    staic staticM () {
      console.log('static m')
    }
}

class foo extends Foo {
    // 
    static ba = '静态属性';
    bar = '实例属性';
    // 私有 es2022添加
    #count = 0;
  
    constructor (name) {
      // 父类构造函数
        super(name)
    }

    get value () {
      return this.bar;
    }

    method () {
      // 父类的原型
      super.m1() 
    }
    static staticMethod () {
      // 指向父类
      super.staticM()
    }
    // 私有 es2022添加
    #privateMethod () {

    }
}
a = new foo('aaa')
a.value // 
foo.ba
foo.staticMethod()
```


### new.target

- 一般在构造函数中， 返回new命令作用于的那个构造函数  
- 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined
- class 内部调用时返回当前class， 继承时， 返回子类 

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```