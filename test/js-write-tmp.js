



// 实在一个有并发限制的promise.all

function myPromiseAll (list, count) {

    return new Promise((resolve, reject) => {
        let running = 0
        let res = []
        let index = 0
        let resCount = 0
        function step (i) {
            if (!list[i]) return
            running++
            list[i]().then(val => {
                resCount++
                running--
                res[i] = val
                if (resCount === list.length) {
                    resolve(res)
                }
                if (running < count && ++index < list.length ) {
                    step(index)
                }
            })
        }
        for (let i = 0; i < list.length && i < count; i++) {
            index = i
            step(i)
        }
    })
}
function delay (count, timer) {
    return new Promise(res => {
        setTimeout(() => {
            console.log(count)
            res(count)
        }, timer)
    })
}
const p1 = () => delay('1',5000)
const p2 = () => delay('2',2000)
const p3 = () => delay('3',3000)
const p4 = () => delay('4',2000)
const p5 = () => delay('5',3000)

const p = [p1,p2,p3,p4,p5]
myPromiseAll(p,3).then(res => console.log(res))




// softbind

Function.prototype.softBind = function (context, ...arg1) {
    let fn = this;
    let args = [...arg1]
    const boundFunction = function (...arg2) {
      context = (!this || this === globalThis) ? context : this;
      return fn.call(context, ...args)
    }
    console.log(fn)
    boundFunction.prototype = Object.create(fn.prototype || null)
    return boundFunction
  }
  
  function sayHello() {
    console.log("Hello, " + this.name);
  }
  
  var person = { name: "Alice" };
  var anotherPerson = { name: "Bob" };
  
  var softBoundHello = sayHello.softBind(person);
  
  softBoundHello(); // "Hello, Alice" - 使用 person 的 this
  softBoundHello.call(anotherPerson); // "Hello, Bob" - 使用 anotherPerson 的 this
  
  
  // json.stringfy  parse

  
// stringfy
// 忽略 function symbol undefined 不可遍历对象
// 循环引用报错
// key -> "key"
// 第二个属性
  // 为数组， 指定要转换的属性
  // 为函数， 会转换所有值
// 

// {x:2} "{"x": 2, 's': 2}"
// [1, false, 'false'] "[1, false, "false"]"


  function stringfy (obj) {
    if (typeof obj === 'string') {
      return `"${obj}"`
    }
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    if (obj === null) return "null";
    if (Array.isArray(obj)) {
      return `[${obj.map(i => stringfy(i)).join(",")}]`
    }
    if (typeof obj === 'object') {
      const tmp = Object.entries(obj).map(([key, value]) => {
        return `"${key}":${stringfy(value)}`
      })
      return `{${tmp.join(",")}}`
    }
    return undefined
  }

  

// lodash.get
// a[3].b -> a.3.b
function get (source, path, defaultValue) {

    const paths = path
        .replace(/\[(w+)\]/g, '.$1')
        .replace(/\["(\w+)"\]/g, ".$1")
        .replace(/\['(\w+)'\]/g, ".$1")
        .split(".")
    let res = source
    for (let key of paths) {
        res = res?.[key]
    }
    return res === undefined ? defaultValue : res
}

// 范例
const object = { a: [{ b: { c: 3 } }] };

//=> 3
get(object, "a[0].b.c");

//=> 3
get(object, 'a[0]["b"]["c"]');

//=> 'default'
get(object, "a[100].b.c", "default");


const object = { a: [{ b: { c: 3 } }] };
get(object, "a[0].b.c");
function get(obj, path, defaultValue) {
  let arr = [];
  let cur = '';
  for (let str of path) {
    if (str === '.') {
      arr.push(cur);
      cur = '';
    } else if (str === '[') {
      arr.push(cur);
      cur = '';
    } else if (str === ']' || str === '"') {

    } else {
      cur += str;
    }
  }
  if (cur) arr.push(cur)
  let res = obj;
  for (let p of arr) {
    if (res[p] === undefined) {
      return defaultValue
    }
    res = res[p]
  }
  return res;
}

// lodash merge



var object = {
    'a': [{ 'b': 2 }, { 'd': 4 }]
  };
   
  var other = {
    'a': [{ 'c': 3 }, { 'e': 5 }]
  };
   
  merge(object, other);
  // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
  
  function merge (target, obj2) {
    if (!target) {
      target = Array.isArray(obj2) ? [] : {};
    }
    Object.keys(obj2).forEach(key => {
      if (typeof obj2[key] === 'object') {
        target[key] = merge(target[key], obj2[key])
      } else {
        target[key] = obj2[key]
      }
    })
    return target
  }


function delay (count, timer) {
    return new Promise(res => {
        setTimeout(() => {
            console.log(count)
            res(count)
        }, timer)
    })
  }
  const p1 = () => delay('1',5000)
  const p2 = () => delay('2',2000)
  const p3 = () => delay('3',3000)
  const p4 = () => delay('4',2000)
  const p5 = () => delay('5',3000)
  
  const p = [p1,p2,p3,p4,p5]
  
  myPromiseAll = async function (parm) {
    return new Promise((res) => {
      let arr = [];
      let len = parm.length;
      let count = 0;
      for (let i = 0; i < parm.length; i++) {
        (async function () {
          let a = await parm[i]()
          count++;
          arr[i] = a
          if (count >= len) res(res)
        })(i);
      }
      return arr;
    })
  }
  
  myPromiseAll(p,3).then(res => console.log(res))
  
  


countOfLetters("A2B3"); // { A: 2, B: 3 }
countOfLetters("A(A3B)2"); // { A: 7, B: 2}
countOfLetters("C4(A(A3B)2)2"); // { A: 14, B: 4, C: 4 }

countOfLetters("C4(A(A3B)2)2")
function countOfLetters (str) {
  // 构建函数， 进行无符号转换  如 A3B -> {A: 3, B: 1}
  // if s === '(' 
    // s === ')' merge(pop1 * count , pop2)
    // stack.push({})


  let len = str.length;
  let i = 0;
  let stack = [];
  while (i < len) {
    let j = i;
    let cur = '';
    if (str[i] === '(' ) {
      i++;
    } else if ( str[j] === ')') {
      j++;
      let count = ''
      while (Number(+str[j])){
        count +=str[j];
        j++;
      }
      const obj = stack.pop();
      const prev = stack.pop();
      for (let key in obj) {
        obj[key] *= count;
        if (prev[key]) obj[key] += prev[key]
      }
      stack.push({...prev, ...obj})
      i = j;
    } else {
      while (str[j] !== '(' && str[j] !== ')' && j < len){
        cur += str[j];
        j++;
      }
      const obj = trans(cur)
      stack.push(obj)
      i = j;
    }
  }
  function trans (str) {
    let res = {};
    let count = '';
    let cur = '';
    for (let s of str) {
      if (Number(+s)) {
        count += s;
      } else {
        if (cur) {
          if (!count) count = 1;
          if (!res[cur]) res[cur] = 0;
          res[cur] += +count;
          cur = s;
          count = '';
        } else {
          cur = s;
        }
      }
    }
    if (cur) {
      if (!count) count = 1;
      if (!res[cur]) res[cur] = 0;
      res[cur] += +count;
    }
    return res;
  }
  return stack[0]
}


// reduce async await

let result = [1,2,3].reduce( (accumulatorPromise, nextID) => {
  return accumulatorPromise.then(() => {
    return methodThatReturnsAPromise(nextID);
  });
}, Promise.resolve());

result.then(e => {
  console.log("Resolution is complete! Let's party.")
});
