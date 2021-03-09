# 归并排序

- 时间复杂度 `O(nlogn)`
- 空间复杂度 `O(n)`
- 稳定

思想：将数组拆分直到子数组只有一个数字，然后将子数组合并成一个包含两个数字的有序数组，然后在合成四个数字的有序数组直到整个数组完成排序

```js
/* 模拟数组 */

var a = new Array(20);

for (let i = 0; i < a.length; ++i) {
  a[i] = ~~(Math.random() * 100 + 1);
}

console.log("排序前：" + a);
let res = new Array(a.length);
mergeSort(a, 0, a.length - 1, res);
console.log("排序后：" + a);

function mergeSort(arr, start, end, res) {
  // 只有一个数字，停止拆分
  if (start == end) return;
  let mid = Math.floor((start + end) / 2);
  // 拆分左边
  mergeSort(arr, start, mid, res);
  // 拆分右边
  mergeSort(arr, mid + 1, end, res);
  // 合并左右
  merge(arr, start, end, res);
}

function merge(arr, start, end, res) {
  let mid1 = Math.floor((start + end) / 2);
  let mid2 = mid1 + 1;
  // 两个子数组 双指针
  let index1 = start,
    index2 = mid2;
  while (index1 <= mid1 && index2 <= end) {
    // 这里等号保证稳定性
    if (arr[index1] <= arr[index2]) {
      res[index1 + index2 - mid2] = arr[index1++];
    } else {
      res[index1 + index2 - mid2] = arr[index2++];
    }
  }

  // 有剩余直接加入到最后
  while (index1 <= mid1) {
    res[index1 + index2 - mid2] = arr[index1++];
  }
  while (index2 <= end) {
    res[index1 + index2 - mid2] = arr[index2++];
  }

  while (start <= end) {
    arr[start] = res[start++];
  }
}
```

原地归并排序（不使用额外空间）：

```js
/* 模拟数组 */

var a = new Array(20);

for (let i = 0; i < a.length; ++i) {
  a[i] = ~~(Math.random() * 100 + 1);
}

console.log("排序前：" + a);
mergeSort(a, 0, a.length - 1);
console.log("排序后：" + a);

function mergeSort(arr, start, end) {
  // 只有一个数字，停止拆分
  if (start == end) return;
  let mid = Math.floor((start + end) / 2);
  // 拆分左边
  mergeSort(arr, start, mid);
  // 拆分右边
  mergeSort(arr, mid + 1, end);
  // 合并左右
  merge(arr, start, end);
}

function merge(arr, start, end) {
  let mid = Math.floor((start + end) / 2);

  // 两个子数组 双指针
  let index1 = start,
    index2 = mid + 1;
  while (index1 <= mid && index2 <= end) {
    if (arr[index1] > arr[index2]) {
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      // 交换后如果后面有更小的往前移动
      if (index2 != end) {
        let v = arr[index2];
        let i = index2;
        while (i < end && arr[i + 1] < v) {
          arr[i] = arr[i + 1];
          i++;
        }
        arr[i] = v;
      }
    }
    index1++;
  }
}
```

原地归并排序本质上还是插入排序，虽然空间复杂度比归并低但是时间效率更差
