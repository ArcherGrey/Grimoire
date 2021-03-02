# 选择排序

- 时间复杂度 `O(n²)`
- 空间复杂度 `O(1)`
- 不稳定

::: tip 思想

双重循环遍历数组，每一轮比较找到最小元素下标，将其交换到首位

:::

```js
function selectionSort(arr) {
  let minIndex;
  for (let i = 0; i < arr.length; ++i) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; ++j) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    let t = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = t;
  }
}
```
