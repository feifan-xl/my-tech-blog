


// 目录

// 设计原则 SOLID
// 1. single 单一职责 （类和方法，接口）
// 2. 开闭原则 （扩展开放，修改关闭）
// 3. 里氏替换原则（基类和子类之间的关系）
// 4. 依赖反转原则（依赖抽象接口，而不是具体对象）
// 5. 接口隔离原则（接口按照功能细分）
// 6. 迪米特法则 (最少知识原则) （类与类之间的亲疏关系）


// 1. 创建型
// 1.1 工厂模式
// 1.2 单例模式
// 1.3 抽象工厂
// 1.4 构造器模式
// 1.5 原型模式

// 2. 结构型

// 3. 行为型 
// 3.1 发布订阅
// 3.2 装饰器
// 3.3 适配器






// 1.1 工厂模式
class Design_1_1 {

  static factory () {
    class Car {
      constructor(model, year) {
          this.model = model;
          this.year = year;
      }
    }

    class CarFactory {
      createCar(model, year) {
          return new Car(model, year);
      }
    }

    const factory = new CarFactory();
    const car1 = factory.createCar("Toyota", 2020);
    const car2 = factory.createCar("Honda", 2019);

  }
}

// 1.2 单例模式

class Design_1_5 {
  static Single () {
    let single = (function () {
      let Single = function () {}
      let obj = {}
      Single.prototype.say = () => obj;
      let si = new Single();
      return () => si;
    })();

    let s1 = single();
    let s2 = single();
    s1.say() == s2.say();
  }
}











// 3.1. 发布订阅
class Design_3_1 {

  static code () {
    class EventEmit {

      constructor () {
        this.eventsMap = {};
      }
    
      on (event, fn) {
        if (!this.eventsMap[event]) this.eventsMap[event] = [];
        this.eventsMap[event].push(fn)
      }
    
      once (event, fn) {
        if (!this.eventsMap[event]) this.eventsMap[event] = [];
        this.eventsMap[event].push((...args) => {
          fn(...args);
          this.off(event, fn);
        })
      }
    
      emit (event, ...args) {
        if (!this.eventsMap[event]) return null;
        this.eventsMap[event].forEach(cb => cb(...args))
      }
    
      off (event, fn) {
        if (!this.eventsMap[event]) return null;
        this.eventsMap[event] = this.eventsMap[event].filter(i => i != fn)
      }
    }
    
    const emmit = new EventEmit();
    
    const subscriber1 = data => console.log(`Subscriber 1 received: ${data}`);
    const subscriber2 = data => console.log(`Subscriber 2 received: ${data}`);
    emmit.on('top1', subscriber1)
    emmit.once('top2', subscriber2)
    emmit.emit('top1', 'top1')
    emmit.emit('top2', 'top2')
    emmit.off('top1', subscriber2)
    emmit.emit('top1', 'top1')
    emmit.emit('top2', 'top2')
  }
  
}

class Design_3_2 {
  static decorator () {
    class Coffee {
      cost() {
          return 5;
      }
    }

    class MilkDecorator {
      constructor(coffee) {
          this.coffee = coffee;
      }

      cost() {
          return this.coffee.cost() + 1;
      }
    }

    class SugarDecorator {
      constructor(coffee) {
          this.coffee = coffee;
      }

      cost() {
          return this.coffee.cost() + 0.5;
      }
    }

    let coffee = new Coffee();
    coffee = new MilkDecorator(coffee);
    coffee = new SugarDecorator(coffee);

    console.log(coffee.cost());  // 6.5

  }
}