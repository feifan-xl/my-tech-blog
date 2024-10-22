

// 目录
// 1. list and tree
// 2. debounce & throttle
// 3. promise 
// 4. object transform
// 5. sort


// 1. list and tree
class code01 {
  static demo () {
    const list = [
      { pid: null, id: 1, data: "1" },
      { pid: 1, id: 2, data: "2-1" },
      { pid: 1, id: 3, data: "2-2" },
      { pid: 2, id: 4, data: "3-1" },
      { pid: 3, id: 5, data: "3-2" },
      { pid: 4, id: 6, data: "4-1" },
    ]

    let a = code01.listToTree(list)
    // console.log(a)

    const obj = {
      "pid": null,
      "id": 1,
      "data": "1",
      "children": [
        {
          "pid": 1,
          "id": 2,
          "data": "2-1",
          "children": [
            {
              "pid": 2,
              "id": 4,
              "data": "3-1",
              "children": [
                {
                  "pid": 4,
                  "id": 6,
                  "data": "4-1"
                }
              ]
            }
          ]
        },
        {
          "pid": 1,
          "id": 3,
          "data": "2-2",
          "children": [
            {
              "pid": 3,
              "id": 5,
              "data": "3-2"
            }
          ]
        }
      ]
    }
    let b = code01.treeToList(obj)
    console.log(b)
  }

  static listToTree (arr) {
    let map = {};
    for (let node of arr) {
      map[node.id] = node;
    }
    let res;
    for (let id in map) {
      const node = map[id]
      if (node.pid != null) {
        if (!map[node.pid].children) map[node.pid].children = [];
        map[node.pid].children.push(node)
      }
      else {
        res = node;
      }
    }
    map = null;
    return res
  }

  static treeToList (obj) {
    let res = [];
    let arr = [obj]
    while (arr.length) {
      let len = arr.length;
      for (let i = 0; i < len; i++ ) {
        const node = arr.shift();
        const childrens = node.children;
        if (childrens) {
          delete node.children;
          arr.push(...childrens)
        }
        res.push(node)
      }
    }
    return res;
  }
}
code01.demo()



// 2. debounce & throttle
class code02 {
  static demo () {
    const conFn = () => console.log(1)
    const fn = code02.debounce(conFn, 1000)
    fn();
    fn();
    fn();
  }

  static debounce (fn, time) {
    let timer;
    return function (...args) {
      if (timer) return
      timer = setTimeout(() => {
        fn.call(fn, ...args)
      }, time)
    }
  }

  static throttle (fn, time) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.call(fn, ...args)
        timer = null
      }, time)
    }
  }
}




// 3. promise 
class code03 {

  static light () {
    const lightFactory =(ligth, time) =>
      new Promise(res => setTimeout(() => {console.log(ligth); res(ligth)}, time))
    async function fn () {
      while (true) {
        await lightFactory('red', 1000)
        await lightFactory('yellow', 500)
        await lightFactory('green', 100)
      }
    }
    fn();
  }
}


// 4. object transform
class code04 {

  static demo () {

    // compiler01
    // const d1 = { 'a.b.c': 1, 'a.b.d': 2,'a.c':5 };
    // console.log(code04.compiler01(d1))

    // let object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    // let a = code04.compiler02(object, ['a[0].b.c', 'a[1]']);
    // console.log(a)
  }
  
  static compiler01 (obj) {
    let res = {};
    Object.keys(obj).forEach(str => {
      const keyList = str.split('.');
      let tmp = res;
      
      keyList.forEach((key, idx) => {
        if (!tmp[key]) {
          tmp[key] = idx == keyList.length - 1 ? obj[str] : {};
        }
        tmp = tmp[key]
      })
    })
    return res;
  }

  static compiler02 (obj, arr) {
    let res = [];
    for (let str of arr) {
      let keyList = [];
      let tmp = '', start = false;
      for (let s of str) {
        if (s == '[') {
          start = true
        } else if (s == ']') {
          start = false
          keyList.push(tmp);
          tmp = ''
        } else if (s !== '.'){
          if (!start) {
            keyList.push(s)
          }
          else {
            tmp += s;
          }
        }
      }
      let resObj = obj
      keyList.forEach((key) => {
        resObj = resObj[key]
      })
      res.push(resObj)
    }
    return res
  }
}
code04.demo();





// 5. sort
class code05 {

  static demo () {
    
    // let arr = ['1.5.1', '1.04.9', '1.45.0', '6.0.0', '5.2'];
    // let a = code05.sortVersion(arr)
    // console.log(a)
  }

  static sortVersion (versionList) {
    return versionList.sort((a, b) => {
      const listA = a.split('.');
      const listB = b.split('.');
      const len = listA.length;
      let idx = 0
      while (idx < len) {
        if (listA[idx] !== listB[idx]) {
          return listA[idx] - listB[idx]
        }
        else {
          idx++;
        }
      }
      return 1
    })
  }
  static async asyncPool () {
    
    const getData = async (val, time) => 
      new Promise(res => setTimeout(() => {console.log(time, val);res(val)}, time))
    const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), 100));
    const promiseList = [
      () => getData(1, 1000),
      () => getData(2, 3000),
      () => getData(3, 1000),
      () => getData(4, 2000),
      () => getData(5, 7000),
      () => getData(6, 1000),
      () => getData(7, 1000),
      () => getData(8, 1000),
    ]
    await asyncPool(2, promiseList);

    async function asyncPool(poolLimt, promiseList) {
      return new Promise((resolve) => {
        let res = [];
        let count = 0;
        let len = promiseList.length;
        let idx = 0;
        while (idx < poolLimt) {
          run(idx)
        }
        function run (id) {
          idx++;
          promiseList[id]().then(val => {
            setResult(val, id)
          })
          .catch(err => {
            setResult(err, id)
          })
        }
        function setResult (val, id) {
          res[id] = val;
          if (idx + 1 < len) run(idx + 1)
          count++;
          if (count == len) resolve(res)
        }
      })
    }

  }
}
code05.demo()









