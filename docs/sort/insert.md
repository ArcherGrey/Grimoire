# 插入排序

- 时间复杂度 `O(n²)`
- 空间复杂度 `O(1)`
- 稳定

::: tip 思想

类似打扑克，一边抓牌一边插入到排好的牌里面

:::

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; ++i) {
    let cur = arr[i]; // 要插入的牌
    let j = i - 1;

    // 如果要插入的比当前小，就把当前的往后移
    while (j >= 0 && cur < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = cur;
  }
}
```
