# 水平垂直居中

::: tip 公共样式

```html
<style>
  /* 代表父元素样式 */
  #parent {
    border: 1px solid black;
  }

  /* 代表想要对齐的元素样式 */
  #son {
    border: 1px solid red;
  }
</style>
```

:::

## 水平居中

### 文本/行内元素/行内块级

原理：`text-align` 控制行内内容相对父级块元素对齐方式

实现：

::: demo

```html
<div id="parent" class="p1">
  <span id="son">
    行内元素
  </span>
</div>

<style>
  .p1 {
    text-align: center;
  }
  #parent {
    border: 1px solid black;
  }
  #son {
    border: 1px solid red;
  }
</style>
```

:::

优点：

- 简单
- 兼容性好

缺点：

- 属性会继承，影像后代行内内容
- 宽度必须小于父元素

### 单个块级元素

原理：`margin` 有空余的时候设置 `auto` 将会均分剩余空间

实现：

::: demo

```html
<div id="parent" class="p2">
  <div id="son" class="s2">
    单个块级元素
  </div>
</div>

<style>
  .s2 {
    width: 100px; /* 必须设置定宽 */
    margin: 0 auto;
  }
</style>
```

:::

优点：

- 简单
- 兼容性好

缺点：

- 必须等宽
- 宽度必须小于父元素

### 多个块级元素

原理：还是 `text-align`

实现：

::: demo

```html
<div id="parent" class="p3">
  <div id="son" class="s3">
    块级元素1
  </div>
  <div id="son" class="s3">
    块级元素2
  </div>
</div>

<style>
  .p3 {
    text-align: center;
  }
  .s3 {
    display: inline-block;
  }
</style>
```

:::

优点：

- 简单
- 兼容性好

缺点：

- 属性会继承，影像后代行内内容
- 换行 空格会产生元素间隔

### 绝对定位

原理：子元素绝对定位，父元素相对定位，组合使用 `left transform margin`

`transform` 实现：

::: demo

```html
<div id="parent" class="p4">
  <div id="son" class="s4">
    块级元素
  </div>
</div>

<style>
  .p4 {
    height: 200px;
    width: 200px; /* 定宽 */
    position: relative;
  }
  .s4 {
    position: absolute;
    left: 50%; /* 父元素宽度一半 */
    transform: translateX(-50%); /* 子元素宽度一半，等同于 margin-left: -50px */
  }
</style>
```

:::

`margin` 实现：

::: demo

```html
<div id="parent" class="p4-1">
  <div id="son" class="s4-1">
    块级元素
  </div>
</div>

<style>
  .p4-1 {
    height: 200px;
    width: 200px; /* 定宽 */
    position: relative;
  }
  .s4-1 {
    position: absolute;
    left: 50%; /* 父元素宽度一半 */
    margin-left: -50px;
    width: 100px; /* margin 需要知道子元素宽度 */
    text-align: center;
  }
</style>
```

:::

优点：

- `margin-left` 兼容性好

缺点：

- 代码多
- 脱离文档流
- 如果使用 `margin` 需要知道子元素宽度
- 如果使用 `transform` 兼容性不好 （`IE9+`）

### 弹性布局

原理：利用弹性布局

实现：

::: demo

```html
<div id="parent" class="p5">
  <div id="son">
    块级元素
  </div>
</div>

<style>
  .p5 {
    display: flex;
    justify-content: center;
  }
</style>
```

:::

优点：

- 简单

缺点：

- 兼容性不好

## 垂直居中

### 文本/行内元素

原理：`line-height`

实现：

::: demo

```html
<div id="parent" class="p6">
  <span id="son">
    行内元素
  </span>
</div>

<style>
  .p6 {
    height: 150px;
    line-height: 150px; /* 值 = 高度 除以 行数 */
  }
</style>
```

:::

优点：

- 简单
- 兼容性好

缺点：

- 需要知道高度
- 需要知道总行数

### 单个块级元素

和水平居中一样

- 子元素绝对定位 父元素相对定位

`transform` 实现：

::: demo

```html
<div id="parent" class="p7-1">
  <div id="son" class="s7-1">
    块级元素
  </div>
</div>

<style>
  .p7-1 {
    height: 150px; /* 定高 */
    width: 150px;
    position: relative;
  }
  .s7-1 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
```

:::

`margin` 实现：

::: demo

```html
<div id="parent" class="p7-2">
  <div id="son" class="s7-2">
    块级元素
  </div>
</div>

<style>
  .p7-2 {
    height: 150px; /* 定高 */
    width: 150px;
    position: relative;
  }
  .s7-2 {
    position: absolute;
    top: 50%;
    margin-top: -50px;
    height: 100px;
    line-height: 100px;
  }
</style>
```

:::

- 弹性布局

实现：

::: demo

```html
<div id="parent" class="p7-3">
  <div id="son" class="s7-3">
    块级元素
  </div>
</div>

<style>
  .p7-3 {
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
  }
</style>
```

:::

## 水平垂直居中

### 行内/行内块级/图片

原理：

- `text-align` 水平居中
- `line-height` 垂直居中

实现：

::: demo

```html
<div id="parent" class="p8">
  <span id="son" class="s8">
    行内元素
  </span>
</div>

<style>
  .p8 {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
```

:::

优点：

- 简单
- 兼容性好

### 块级

**子绝父相**

`transform` 实现 ：

::: demo

```html
<div id="parent" class="p9-1">
  <div id="son" class="s9-1">
    块级元素
  </div>
</div>

<style>
  .p9-1 {
    height: 100px;
    width: 100px;
    position: relative;
  }

  .s9-1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

:::

`margin` 实现 1（需要知道子元素宽高）：

::: demo

```html
<div id="parent" class="p9-2">
  <div id="son" class="s9-2">
    块级元素
  </div>
</div>

<style>
  .p9-2 {
    height: 100px;
    width: 100px;
    position: relative;
  }

  .s9-2 {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -25px;
    height: 50px;
    width: 50px;
  }
</style>
```

:::

`margin` 实现 2（需要知道子元素宽高）：

::: demo

```html
<div id="parent" class="p9-3">
  <div id="son" class="s9-3">
    块级元素
  </div>
</div>

<style>
  .p9-3 {
    height: 100px;
    width: 100px;
    position: relative;
  }

  .s9-3 {
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 50px;
    width: 50px;
  }
</style>
```

:::

**弹性布局**

实现：

::: demo

```html
<div id="parent" class="p10">
  <div id="son" class="s10">
    块级元素
  </div>
</div>

<style>
  .p10 {
    height: 150px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s10 {
    height: 50px;
    width: 50px;
  }
</style>
```

:::
