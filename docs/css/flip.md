# 纯 css 实现翻转 `flip` 效果

当鼠标滑过包含块时，元素整体翻转 180°，以实现**正反**面的切换。

## 内容组成

1. 首先需要一个最外层的 `card` 来包裹整个翻转区域
2. 然后需要正面和反面的内容（这里简单处理只设置正反面的背景颜色来区分）

## 利用布局

需要让正面和反面重叠在一起，很容易想到外层 `card` 用相对定位，内层正反都使用绝对定位都相对于外层 `card`，使其重叠，然后需要设置反面翻转 180°。

**注意：都是绝对定位元素后来居上，所以正面需要放到反面后面，或者直接设置正面 `z-index` 大于反面**

## 实现 3D 效果

翻转效果其实是一个 `3D` 效果，所以这里需要用到一个属性 `transform-style` 使得子元素能够表现出翻转效果，同时还要设置 `transition` 实现过渡动效。

`transition` 需要一个状态就是 `hover` 卡片时，卡片翻转也就是 `card` 翻转 180°

## 补充说明

如果想实现垂直翻转就修改 `rotateY` 为 `rotateX`

如果想通过点击事件来触发翻转，那么在点击事件中添加刪除 `card` 的类即可

## 重点总结

- 动画效果：添加 `transition` 过度
- 正反重叠：最外层相对定位，内部正反两面绝对定位，反面先翻转 180°
- `hover` 翻转：卡片 `hover` 翻转 180°
- 3D 效果：卡片添加 `transform-style` 使子元素 3D 空间呈现

## 具体代码实现

::: demo

```html
<div class="card-filp">
  <div class="back"></div>
  <div class="front"></div>
</div>

<style>
  .card-filp {
    height: 200px;
    width: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: 1s;
  }

  .front,
  .back {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .front {
    background: lightgreen;
  }
  .back {
    background: lightblue;
  }
  .back {
    transform: rotateX(180deg);
  }
  .card-filp:hover {
    transform: rotateX(180deg);
  }
</style>
```

::: demo
