# requestAnimationFrame

优点：

- 会集中 `dom` 操作在一次重绘或者回流中完成渲染，间隔时间和浏览器刷新频率一致
- 隐藏或者不可见元素中不会进行重绘或回流
- 页面不是激活状态会自动停止

问题：

- 在主线程上完成，如果主线程繁忙，动画会出现卡顿

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

相关 `api`:

- `requestAnimationFrame` 会在每次屏幕刷新时调用
- `requestIdleCallback` 会在每次屏幕刷新时判断是否空闲，如果空闲被调用，可以把一些可能影响动画性能但是优先级比较低的操作放到这里执行

## setTimeout

- `setTimeout` 会有延时，浏览器本身决定即使设置 0 延时也至少会有 `4ms` 延时

  - 可以通过 `postMessage` 来实现零延时：

  ```js
  // Only add setZeroTimeout to the window object, and hide everything
  // else in a closure.
  (function() {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    // Like setTimeout, but only takes a function argument.  There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeout(fn) {
      timeouts.push(fn);
      window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
      if (event.source == window && event.data == messageName) {
        event.stopPropagation();
        if (timeouts.length > 0) {
          var fn = timeouts.shift();
          fn();
        }
      }
    }

    window.addEventListener("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
  })();
  ```

- `setInterval` 固定间隔将定时器加入任务队列，如果任务本身执行时间不固定，可能导致间隔时间不一致，如果任务执行时间超过间隔时间，可能导致没有停顿
