




// const getData = () => new Promise((res) => setTimeout(() => {res(4)}, 100))

// async function fn () {
//   const a = await getData()
//   let b = a + 5
//   return b;
// }

// async function foo () {
//   const a = await fn();
//   console.log(a)
//   return a
// }
// foo().then(res => console.log(res, 6666))
// async 返回值为 promise






const getData = () => new Promise((res) => setTimeout(() => {res(4)}, 100))

async function fn () {
  const a = await Promise.resolve(2)
  let b = a + 5
  return b;
}

async function foo () {
  const a = await fn();
  console.log(a)
  return a
}
foo().then(res => console.log(res, 6666))