
// console.log(0);

// setTimeout(() => {          // callback1
//   console.log(1);
//   setTimeout(() => {        // callback2
//     console.log(2);
//   }, 0);
//   setImmediate(() => {      // callback3
//     console.log(3);
//   })
//   process.nextTick(() => {  // callback4
//     console.log(4);  
//   })
// }, 0);

// setImmediate(() => {        // callback5
//   console.log(5);
//   process.nextTick(() => {  // callback6
//     console.log(6);  
//   })
// })

// setTimeout(() => {          // callback7              
//   console.log(7);
//   process.nextTick(() => {  // callback8
//     console.log(8);   
//   })
// }, 0);

// process.nextTick(() => {    // callback9
//   console.log(9);  
// })

// console.log(10);


// // 0 10 9 1 4 7 8 5 6 3 2


Promise.resolve(1).then(res => {
  process.nextTick(() => console.log(2))
  console.log(3)
})


Promise.resolve(1).then(res => {
  console.log(1)
})