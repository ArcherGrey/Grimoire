# 堆排序

- 时间复杂度 `O(nlogn)`
- 空间复杂度 `O(1)`
- 不稳定

::: tip 堆

符合下面条件之一的完全二叉树：

- 根节点值大于等于子节点的值，称为最大堆
- 根节点值小于等于子节点的值，称为最小堆

:::

排序过程：

1. 构建最大堆，取出堆顶数字
2. 调整堆重新构建最大堆，再次取出堆顶
3. 重复操作

```js
function heapSort(arr) {
  // 构建最大堆
  buildMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    // 将最大值放到最后
    let t = arr[0];
    arr[0] = arr[i];
    arr[i] = t;
    // 调整最大堆
    maxHeapify(arr, 0, i);
  }
}

// 构建最大堆
function buildMaxHeap(arr) {
  // 从最后一个非叶子节点开始调整最大堆，最后一个非叶子节点下标就是 arr.length/2 - 1
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, i, arr.length);
  }
}

// 调整最大堆
function maxHeapify(arr, i, heapSize) {
  // 左右子节点下标
  let l = 2 * i + 1;
  let r = l + 1;

  let largest = i;
  if (l < heapSize && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < heapSize && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest != i) {
    let t = arr[largest];
    arr[largest] = arr[i];
    arr[i] = t;
    maxHeapify(arr, largest, heapSize);
  }
}
```
