
import {foo, obj} from './01.js';

console.log(foo, obj);
obj.b = 'main'
import b from './02.js'

console.log(b, obj)
setTimeout(() => {
  console.log(foo)
}, 1000)