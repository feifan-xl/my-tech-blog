
const data = {
  foo: true,
  bar: true,
}
let activeEffect, effectStack = [];
function reactive (target) {
  const proxy = new Proxy(target, {
    get (target, key, receiver) {
      track(target, key);

      return target[key]
    },
    set (target, key, value, receiver) {
      const oldVal = target[key]
      if (oldVal !== value) {
        trigger(target, key)
        target[key] = value;
      }
    }
  })
}
// targetMap = {target: map<key>};
// map<key> = {key: set<effects>};
let targetMap = new Map();
function track (target, key) {
  const keyMap = targetMap.get(target);
  if (!keyMap) {
    keyMap = new Map();
    target.set(target, keyMap);
  }
  const effects = keyMap.get(key);
  if (!effects) {
    effects = new Set();
    keyMap.set(key, effects);
  }
  effects.add(activeEffect);
  activeEffect.deps.push(effects)
}

function trigger (target, key) {
  const keyMap = targetMap.get(target);
  const effects = keyMap.get(key);
  effects.forEach(fn => {
    fn();
  })
}

function effect (fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = fn;
    effectStack.push(activeEffect)
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }
  effectFn.deps = [];
  effectFn();
}
function cleanup (effectFn) {
  for(let i = 0, len = effectFn.deps.length; i< len; i++) {
    let deps = effectFn.deps[i];
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0;
}

const obj = reactive(data);
effect(() => {
  obj.foo = false;
})