# 冒泡排序

- 时间复杂度 `O(n²)`
- 空间复杂度 `O(1)`
- 稳定

一般有三种写法：

- 一边比较一边向后两两交换，将最大值 / 最小值冒泡到最后一位；
- 经过优化的写法：使用一个变量记录当前轮次的比较是否发生过交换，如果没有发生交换表示已经有序，不再继续排序；
- 进一步优化的写法：除了使用变量记录当前轮次是否发生交换外，再使用一个变量记录上次发生交换的位置，下一轮排序时到达上次交换的位置就停止比较。

## 第一种

```js
function bubbleSort(arr) {
  let l = arr.length;

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < l - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        let t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }
    }
  }
}
```

其中有一个小技巧，交换的时候不使用中间变量：

```js
arr[j + 1] = arr[j] - arr[j + 1];
arr[j] = arr[j] - arr[j + 1];
arr[j + 1] = arr[j + 1] + arr[j];
```

## 第二种

```js
function bubbleSort(arr) {
  let l = arr.length;
  let mark = true; // 标记是否交换过
  for (let i = 0; i < l; ++i) {
    if (!mark) break; // 如果没有交换过，说明剩余的已经有序，结束排序
    mark = false;
    for (let j = 0; j < l - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        let t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
        mark = true;
      }
    }
  }
}
```

## 第三种

```js
function bubbleSort(arr) {
  let l = arr.length;
  let mark = true; // 标记是否交换过
  let lastIndex = l - 1;
  let swapIndex = -1; // 记录上次交换的位置
  while (mark) {
    mark = false;
    for (let i = 0; i < lastIndex; ++i) {
      if (arr[i] > arr[i + 1]) {
        let t = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = t;
        mark = true;
        swapIndex = i;
      }
    }
    lastIndex = swapIndex; // 最后一次交换的位置就是没有排序的最后一个元素下标
  }
}
```
