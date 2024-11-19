

function quickSort (arr, l = 0, r = arr.length - 1) {
  if (l >= r) return
  function getPivot (i, j) {
    const pivot = arr[j];
    let low = i;
    for (let k = i; k < j; k++) {
      if (arr[k] <= pivot) {
        [arr[low], arr[k]] = [arr[k], arr[low]]
        low++;
      }
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return low;
  }

  let pivot = getPivot(l, r)
  quickSort(arr, l, pivot - 1);
  quickSort(arr, pivot + 1, r)

}


const nums = [3, 2, 1, 5, 6, 4,64,12,99,21];
quickSort(nums);
console.log(nums)