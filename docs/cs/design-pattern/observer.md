

## observer

观察者模式定义了对象之间的一对多依赖关系  
当一个对象改变状态时  
所有依赖它的对象都会收到通知并自动更新  



```
class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

class Observer {
    update(message) {
        console.log(message);
    }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers("Hello Observers!");

```