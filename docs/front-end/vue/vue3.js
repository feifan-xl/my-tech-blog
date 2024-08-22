let activeEffect;

const bucket = new WeakMap(); 

const data = {text: 'heoo'}
const tempObj = {};

function effect(fn) {

    const effectFn = () => {
        activeEffect= effectFn
        fn()
    }
    effectFn.deps = []
    effectFn()
}

function track (traget, key) {
    if (!activeEffect) return
    let depsMap = bucket.get(traget)
    if (!depsMap) {
        depsMap = new Map()
        bucket.set(traget, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
        deps = new Set()
        depsMap.set(key, deps)
    }
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}

function trigger (target, key) {
    const depsMap = bucket.get(target)
    const effects = depsMap.get(key)
    const effectsToRun = new Set(effects)
    effectsToRun.forEach(effectFn => effectFn());
}

const obj = new Proxy(data, {
    get (traget, key) {
        if (!activeEffect) return

        track(traget, key)
        return traget[key]
    },
    set(traget, key, newVal) {
        traget[key] = newVal
        trigger(traget, key)
    }
})


effect(() => {
    tempObj.text = obj.text;
    console.log("tempObj.text :>> ", tempObj.text);
})

setTimeout(() => {
    obj.text = "hi vue3";
  }, 1000);