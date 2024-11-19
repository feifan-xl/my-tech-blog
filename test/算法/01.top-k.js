

// top-k  arr = n

// 01. 优先队列  kn  k
// 02. 最小堆  n * logk k
// 03. 最大堆  logn  
// 04. 快排  n -> n^2


function fn (arr) {
  // 非叶子节点 up
  let len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapifyUp(i);
  }

  function heapifyUp(idx) {
    let largest = idx;
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;
    if (left < len && arr[left] > arr[idx]) {
      largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }
    if (largest !== idx) {
      [arr[largest], arr[idx]] = [arr[idx], arr[largest]];
      heapifyUp(largest);
    }
  }
}

const array = [12, 111, 13, 5, 66, 7,6,88,11,33];
const heap = fn(array)
console.log(array)



// quick sort
function fn (arr, k) {

  let len = arr.length;
  let i = 0, j = len - 1;

  function getPivotId (i, j) {
    let random = Math.floor(Math.random() * (j - i + 1)) + i;
    let tmp = i;
    for (let k = i; k < j; k++) {
      if (arr[k] >= arr[random]) {
        [arr[k], arr[tmp]] = [arr[tmp], arr[k]];
        tmp++;
      }
    }
    [arr[tmp], arr[random]] = [arr[random], arr[tmp]];
    return tmp;
  }

  while (i <= j) {
    let pivot = getPivotId(i , j);
    if (pivot === k - 1) {
      return arr.slice(0, k)
    } else if (pivot > k - 1) {
      getPivotId(i, pivot- 1)
    } else {
      getPivotId(pivot + 1, j)
    }
  }
  return arr.slice(0, k)
}


const array = [12, 111, 13, 5, 66, 7,6,88,11,33];
const heap = fn(array, 3)
console.log(array)
