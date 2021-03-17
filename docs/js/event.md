# 事件

::: tip 概念
事件是编程时系统内发生的动作或发生的事情，`web` 中事件在浏览器窗口中被触发并且通常被绑定到窗口内部的特定部分，可能是一个元素或者一系列元素
:::

::: warning 注

网页事件不是 `JavaScript` 语音的核心，而是内置在浏览器环境 `APIs`

:::

## 网页事件

### 事件处理器属性

```js
const btn = document.querySelector("button");

btn.onclick = function() {
  const rndCol =
    "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  document.body.style.backgroundColor = rndCol;
};
```

上面的 `onclick` 就是这个情景下的事件处理器属性

### 内联事件处理器

```html
<button onclick="bgChange()">Press me</button>
<script>
  function bgChange() {
    const rndCol =
      "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
    document.body.style.backgroundColor = rndCol;
  }
</script>
<!-- or -->
<button onclick="alert('Hello, this is my old-fashioned event handler!');">
  Press me
</button>
```

这样 `html JavaScript` 都混在一起文档很难解析，而且随着代码增大，会越来越难以管理。

::: warning 注

尽量不要使用内联事件处理

:::

### `addEventListener()` 和 `removeEventListener()`

- `addEventListener`
  - 优点
    - 允许给一个事件注册多个监听器
    - 提供了更精细的方式控制监听器触发（可以配置冒泡或者捕获）
    - 对任何 `DOM` 元素都有效
  - 如果注册多个相同的监听器（`options` 的 `capture` 相同）只会保留一个
  - 监听器触发时的 `this` 指向时该元素的引用，和 `event.currentTarget` 一样
- `removeEventListener`
  - 如果监听器被移除，事件正在执行会立即停止

### 冒泡和捕获

当事件发生在具有父元素的元素上，现代浏览器会执行两个不同的阶段：

- 捕获
  - 浏览器检查元素的最外层祖先 `html`，是否在捕获阶段注册了事件监听器，如果是就运行
  - 然后移动到内部的下一个祖先元素，执行相同的操作，直到实际点击的元素
- 冒泡

  - 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个事件监听器，如果是就运行
  - 然后移动到外部的下一个直接的祖先元素，执行相同的操作，直到 `html` 元素

  默认情况下都是在冒泡阶段注册事件（`addEventListener` 第三个参数设置为 true 可以在捕获阶段注册），这样可能导致一些意想不到的问题，可以通过 `stopPropagation` 来阻止继续向外冒泡。

::: tip 事件委托

如果想要在大量子元素中触发事件然后都执行相同的代码，可以将监听器绑定到父元素上，然后让子元素冒泡到父元素上，从而避免在每个子元素上设置事件监听器

:::