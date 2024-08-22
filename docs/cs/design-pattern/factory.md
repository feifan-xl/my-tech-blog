

## factory

工厂模式提供一个创建对象的接口，但不指定具体类  

适用于需要生成许多具有相同属性的对象的场景  

```
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

```