
var modules = {
  './main.js': (module) => {
    module.exports = "不要秃头啊";
  }
}

var cache = {};
const require = (modulePath) => {
  var cachedModule = cache[modulePath]; //获取模块缓存
  if (cachedModule !== undefined) {
    //如果有缓存则不允许模块内容，直接retuen导出的值
    return cachedModule.exports;
  }

  var module = (cache[modulePath] = {
    exports: {},
  });
  //运行模块内的代码，在模块代码中会给module.exports对象赋值
  modules[modulePath](module, module.exports, require);

  //导入module.exports对象
  return module.exports;
}

let author = require(module)
console.log(author)