


class Coffee {
  cost () {
    return 5
  }
}

class CoffeeDecorator {
  constructor (coffee) {
    this._coffee = coffee
  }
  cost () {
    return this._coffee.cost();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost () {
    return this._coffee.cost() + 2;
  }
}

let coffee = new Coffee();

milkCoffee = new MilkDecorator(coffee);
console.log(milkCoffee.cost())

