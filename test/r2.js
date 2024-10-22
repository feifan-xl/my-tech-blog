
var mod = require('./r1.js')

console.log(2, mod.counter);  // 3
mod.incCounter();
console.log(2, mod.counter); // 3

module.exports = {
  a: 1
};