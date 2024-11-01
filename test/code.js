


  // //使用
  // let arrFromRange = Array.from(range);
  // console.log(arrFromRange);   //[5,6,7,8,9,10]
  function Range(from, to) {
    this.from = from
    this.to = to;
  }
  Range.prototype[Symbol.iterator] = function () {
    let value =  this.from;
    let to = this.to;
    return  {
      next () {
        value++;
        const done = value >= to;
        return {
          value,
          done
        }
      }
    }
  }
  // range(from, to)
  let range = new Range(5, 11);  //创建一个range对象
  //使用for...of循环
  for (const num of range) {
      console.log(num);    //依次打印5,6,7,8,9,10
  }

  define(function(require, exports, module) {
    // 模块代码
  });
  function define(fn) {
    const moduleCache = {};

    function require (moduleName) {
      if (moduleCache[moduleName]) return moduleCache[moduleName];
      // load module
    }

    function exports () {}

    function module () {}

    fn.call(fn, require, exports, module);
  }
