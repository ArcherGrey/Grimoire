# DocumentFragment

## 概述

`DocumentFragment` 文档片段，一个没有父对象的最小文档对象。它被作为一个轻量版的 `Document` 使用，就像标准的 `document` 一样，存储由节点（`nodes`）组成的文档结构。与 `document` 相比，最大的区别是 `DocumentFragment` 不是真实 `DOM` 树的一部分，它的变化不会触发 `DOM` 树的重新渲染，且不会导致性能等问题

## 使用

```html
<ul id="list"></ul>

<script>
  const list = document.querySelector("#list");
  const fruits = ["Apple", "Orange", "Banana", "Melon"];

  // 创建 DocumentFragment
  const fragment = document.createDocumentFragment();

  fruits.forEach(fruit => {
    const li = document.createElement("li");
    li.innerHTML = fruit;
    fragment.appendChild(li); // 添加子节点
  });

  list.appendChild(fragment);
</script>
```
