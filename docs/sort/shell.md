# 希尔排序

- 时间复杂度 由增量序列决定 介于 `O(n) ~ O(n²)`
- 空间复杂度 `O(1)`
- 不稳定

本质上是对插入排序的一种优化，基本思想是：

- 将待排序数组按照一定的间隔分为多个子数组，每组分别进行插入排序。这里按照间隔分组指的不是取连续的一段数组，而是每跳跃一定间隔取一个值组成一组。
- 逐渐缩小间隔进行下一轮排序
- 最后一轮时，取间隔为 1，也就相当于直接使用插入排序。但这时经过前面的“宏观调控”，数组已经基本有序了，所以此时的插入排序只需进行少量交换便可完成。

其中，每一遍排序的间隔在希尔排序中被称为增量，增量组成的序列称为增量序列，增量依次递减，最后一个增量必须为 1，所以希尔排序又被称为缩小增量排序。

增量序列的选择会极大影响排序的效率，这里我们选择初始增量是长度的一半，每遍增量减半：

```js
function shellSort(arr) {
  for (let gap = arr.length >> 1; gap > 0; gap >>= 1) {
    // 分组
    for (let groupStartIndex = 0; groupStartIndex < gap; groupStartIndex++) {
      // 插入排序
      for (
        let curIndex = groupStartIndex + gap;
        curIndex < arr.length;
        curIndex += gap
      ) {
        let cur = arr[curIndex];
        let preIndex = curIndex - gap;
        while (preIndex >= groupStartIndex && cur < arr[preIndex]) {
          arr[preIndex + gap] = arr[preIndex];
          preIndex -= gap;
        }
        arr[preIndex + gap] = cur;
      }
    }
  }
}

// 优化
function shellSort(arr) {
  for (let gap = arr.length >> 1; gap > 0; gap >>= 1) {
    // 分组
    for (let i = gap; i < arr.length; ++i) {
      let cur = arr[i];
      let preIndex = i - gap;
      while (preIndex >= 0 && cur < arr[preIndex]) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = cur;
    }
  }
}
```

增量元素不互质，则小增量可能根本不起作用
