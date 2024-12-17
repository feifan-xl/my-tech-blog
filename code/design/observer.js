

class Subject {
  constructor () {
    this.list = [];
  }

  attach (observer) {
    this.list.push(observer);
  }
  notify (data) {
    this.list.forEach(i => i.updata.call(i, data))
  }

  detach (observer) {

  }
}

class Observer {
  constructor (name) {
    this.name = name
  }

  updata (data) {
    console.log(this.name, data)
  }
}

let observer1 = new Observer('ob1');
let observer2 = new Observer('ob2');
let subject = new Subject();
subject.attach(observer1)
subject.attach(observer2)
subject.notify('111')