
var mod = require('./r1.js')

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3

const b = require('./r2.js')
console.log(b)