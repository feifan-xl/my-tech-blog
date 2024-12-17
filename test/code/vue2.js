
new Vue({
  data: {
    message: 1,
  },
  compiler: function () {
    console.log(this.message);
  }
});

function Vue (options) {
  observe(options.data);
  compiler(options.compiler);
}

function observe (value) {
  if (typeof value === 'object') {
    return new Observer(value);
  }
}

function Observer (target) {
  this.value = target;

  Object.keys(target).forEach(key => {
    defineReactive(target, key, target[key])
  })
}

function defineReactive (target, key, val) {
  let dep = new Dep();

  Object.defineProperty(target, key, {
    get() {
      // receive
      if (Dep.target) {
        dep.depend();
      }
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        // update
        dep.notify();
      }
    }
  })
}

class Dep {
  constructor () {
    this.subs = [];
  }
  depend () {
    // this.subs.push(watcher)
    this.subs.push(Dep.target);

  }
  notify () {
    this.subs.forEach(cb => cb.update())
  }
}

class Watch {
  constructor (cb) {
    this.cb = cb;
    this.value = this.get();
  }

  get () {
    Dep.target = this;
  }

  update() {
    this.cb();
  }

}
function compiler (fn) {
  new Watch(fn);
}

