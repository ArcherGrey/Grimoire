# 特效合集

## `Hover`

### 立体按压

1. 按压前有阴影
2. 按压后阴影消失，体积缩小

~~体积缩小是关键效果，阴影可选~~

::: demo

```html
<div class="hover-1"></div>

<style>
  .hover-1 {
    height: 100px;
    width: 300px;
    background: green;
    margin: 2rem;
    box-shadow: 0 0 1rem gray;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 50px;
  }
  .hover-1:hover {
    box-shadow: 0 0 0px gray;
    transform: scale(0.9);
  }
</style>
```

:::

### 亮框提示

- `filter` 实现背景由暗变亮
- `box-shadow` 实现亮框
- `translate` 实现卡片上移

::: demo

```html
<ul class="hover-2">
  <li></li>
  <li></li>
  <li></li>
</ul>
<style>
  .hover-2 li {
    display: inline-block;
    height: 200px;
    width: 150px;
    background: lightgreen;
    box-shadow: 0 2px 2px #222222;
    border: 2px solid transparent;
    border-radius: 5px;
    filter: brightness(0.7);
    cursor: pointer;
    transition: all 0.2s;
  }
  .hover-2 li:hover {
    box-shadow: 0 0 30px yellow;
    border: 2px solid yellow;
    transform: translate(0, -10%);
    filter: brightness(1);
  }
</style>
```

:::

### 悬停显示内容

- `transition` 提供动画效果
- `opacity height` 控制显隐

::: demo

```html
<div class="hover-3-card">
  <div class="hover-3-info">
    <h2>Hover cat</h2>
    <p>
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
      测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档测试文档
    </p>
  </div>
</div>
<style>
  /* Transitions */
  .hover-3-info {
    transition: all 0.5s cubic-bezier(0.48, -0.28, 0.41, 1.4);
  }

  .hover-3-info p {
    transition: all 0.4s ease-out;
    margin: 0;
  }

  .hover-3-card {
    background: #fff;
    box-shadow: 0 0 5em rgba(0, 0, 0, 0.4);
    width: 18em;
    height: 22em;
    position: relative;
  }

  .hover-3-card:hover .hover-3-info {
    height: 12em;
  }

  .hover-3-card:hover .hover-3-info p {
    opacity: 1;
    transform: translateY(0);
    overflow: auto;
    height: 100%;
  }

  .hover-3-info {
    background: #fff;
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1em 1.5em;
    overflow: hidden;
    height: 4em;
  }

  .hover-3-info p {
    opacity: 0;
    transform: translateY(2em);
  }
</style>
```

:::

## 标题

### 标题前置短竖线

- 用伪类 `before` 为 `title` 添加一个前置子元素
- 子元素采用 `inline-block` 布局，尺寸用 `em` 度量

::: demo

```html
<div class="title-1">
  用户数据
</div>
<style>
  .title-1 {
    font-size: 2rem;
    line-height: 5rem;
    color: white;
    background: lightblue;
  }
  .title-1::before {
    content: "";
    display: inline-block;
    width: 0.2em;
    background: yellow;
    height: 0.8em;
    margin-right: 0.5em;
  }
</style>
```

:::

## 字体

### 字体阴影

依赖 `text-shadow` 实现阴影效果

::: demo

```html
<div class="font-1">字体阴影</div>
<style>
  .font-1 {
    color: rgb(253, 219, 94);
    font-size: 3rem;
    text-shadow: 1px 2px 2px black;
  }
</style>
```

:::

### 氖光效果（Neon）

设置 `3~n` 层阴影效果，每一层的模糊半径（文字阴影的第三个参数）间隔较大，并且每一层的阴影颜色相同即可。

::: demo

```html
<div class="font-2-bg">
  <p class="font-2">氖光效果 Neon</p>
</div>
<style>
  .font-2-bg {
    background: #000;
  }
  .font-2 {
    font-size: 50px;
    text-align: center;
    color: #fff;
    text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff, 0 0 100px
        #0ebeff, 0 0 200px #0ebeff;
  }
</style>
```

:::

## 背景

### 电影海报

- 放大图片的一个部分
- 高斯模糊
- 黑色半透明蒙版

::: demo

```html
<div class="background-1">
  <div class="figure"></div>
  <div class="modal">
    名侦探柯南<img :src="$withBase('/css_amazing_1.png')" width="100px" />
  </div>
</div>
<style>
  .background-1 {
    position: relative;
  }
  .background-1 .figure {
    background: url("/css_amazing_1.png");
    background-size: 200%;
    height: 200px;
    width: 400px;
    filter: blur(16px);
  }
  .background-1 .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    height: 200px;
    width: 400px;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
  }
</style>
```

:::

### 毛玻璃蒙版

- 两层图
  - 底层完整清晰
  - 顶层显示部分 高斯模糊
  - 位移一致叠加成一张图 `background:fixed`
- 顶层再加上一层半透明蒙版

::: demo

```html
<div class="background-2">
  <div class="blur-modal"></div>
  <div class="black-modal">描述文字</div>
</div>
<style>
  .background-2 {
    position: relative;
    height: 200px;
    width: 300px;
    background: fixed url("/css_amazing_1.png");
  }
  .background-2 .blur-modal {
    position: absolute;
    height: 50px;
    width: 300px;
    top: 150px;
    background: fixed url("/css_amazing_1.png");
    filter: blur(1rem);
  }
  .background-2 .black-modal {
    position: absolute;
    height: 50px;
    width: 300px;
    top: 150px;
    background: rgba(0, 0, 0, 0.2);
    color: white;
  }
</style>
```

:::

## 边框

### 边框长度变化

- 利用 `before after` 绘制左上和右下
- `hover` 时修改两个伪元素的高宽

::: demo

```html
<div class="border-1"></div>

<style>
  .border-1 {
    position: relative;
    --borderColor: #03a9f3;
    height: 100px;
    width: 200px;
  }
  .border-1::before,
  .border-1::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    transition: 0.3s ease-in-out;
  }

  .border-1::before {
    top: -1px;
    left: -1px;
    border-top: 1px solid var(--borderColor);
    border-left: 1px solid var(--borderColor);
  }

  .border-1::after {
    right: -1px;
    bottom: -1px;
    border-bottom: 1px solid var(--borderColor);
    border-right: 1px solid var(--borderColor);
  }

  .border-1:hover::before,
  .border-1:hover::after {
    width: 100%;
    height: 100%;
  }
</style>
```

:::

## 参考

- [CSS 奇思妙想边框动画](https://juejin.cn/post/6918921604160290830#)
