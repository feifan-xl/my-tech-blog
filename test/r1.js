var counter = {
  a:1
};
function incCounter() {
  counter.a++;
}

setTimeout(() => {
  console.log(1, counter);
  incCounter()
  console.log(1, counter);
}, 400)
module.exports = {
  counter: counter,
  incCounter: incCounter,
};