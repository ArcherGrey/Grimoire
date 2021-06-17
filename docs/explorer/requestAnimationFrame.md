# requestAnimationFrame

优点：

- 会在一次重绘或者回流中完成渲染，间隔时间和浏览器刷新频率一致
- 隐藏或者不可见元素中不会进行重绘或回流
- 页面不是激活状态会自动停止

场景：

- 动画
- 大数据渲染

```js
var total = 100000;
var size = 100;
var count = total / size;
var done = 0;
var ul = document.getElementById("list");

function addItems() {
  var li = null;
  var fg = document.createDocumentFragment();

  for (var i = 0; i < size; i++) {
    li = document.createElement("li");
    li.innerText = "item " + (done * size + i);
    fg.appendChild(li);
  }

  ul.appendChild(fg);
  done++;

  if (done < count) {
    requestAnimationFrame(addItems);
  }
}

requestAnimationFrame(addItems);
```

兼容性：不支持 `ie9` 以下
