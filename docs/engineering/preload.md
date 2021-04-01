# 资源预加载

**只是预加载，加载完成后不会执行**

`preload`:对于当前页面很有必要的资源使用 (关键的脚本、字体、主要图片)

`prefetch`:对于可能在将来的页面中使用的资源使用

- 从一个页面跳转到另一个页面 `prefetch` 的请求不会中断
- 至少会缓存 5 分钟

## 缓存行为

`Chrome` 有四种缓存:

- `HTTP` 缓存
- 内存缓存
- `Service Worker` 缓存
- `Push` 缓存

`preload` 和 `prefetch` 都被存储在 `HTTP` 缓存中。

1. 当一个资源被 `preload` 或者 `prefetch` 获取后，它可以从 `HTTP` 缓存移动至渲染器的内存缓存中。
2. 如果资源可以被缓存（比如说存在有效的 `cache-control` 和 `max-age`），它被存储在 `HTTP` 缓存中可以被现在或将来的任务使用，如果资源不能被缓存在 `HTTP` 缓存中，作为代替，它被放在内存缓存中直到被使用。

## 优先级

![优先级](/eng_preload_1.png)

`preload` 使用 `as` 属性加载的资源将会获得与资源 `type` 属性所拥有的相同的优先级。比如说，`preload as="style"` 将会获得比 `as="script"` 更高的优先级。这些资源同样会受内容安全策略的影响（比如说，脚本会受到其 `src` 属性的影响）。

不带 `as` 属性的 `preload` 的优先级将会等同于异步请求。

## 问题

1. 没有用到的 `preload` 资源在 `Chrome` 的 `Console` 里会在 `onload` 3s 后发生警告

需要明确 `preload` 是一定会用到的资源，否则相当于浪费了流量

2. 错误使用可能导致二次获取

- `prefetch` 不要作为 `preload` 的后备，它们适用于不同场景
- 明确 `as` 属性使用
- 添加 `crossorigin` 属性

3. 不要预加载所有文件

- `preload` 关键文件（可能阻塞加载的，例如图片、样式、字体、媒体资源）

## 应用

### 检测是否支持

```js
const preloadSupported = () => {
  const link = document.createElement("link");
  const relList = link.relList;
  if (!relList || !relList.supports) return false;
  return relList.supports("preload");
};
```

### 脚本化预加载

在这里创建一个 `HTMLLinkElement` 实例，然后将他们附加到 `DOM` 上:

```js
// 这意味着浏览器将预加载这个JavaScript文件，但并不实际执行它。
var preloadLink = document.createElement("link");
preloadLink.href = "myscript.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);
```

如果要对其加以执行，在需要的时候，你可以执行：

```js
var preloadedScript = document.createElement("script");
preloadedScript.src = "myscript.js";
document.body.appendChild(preloadedScript);
```

当你需要预加载一个脚本，但需要推迟到需要的时候才令其执行时，这种方式会特别有用。

### 加载完成立即生效

```html
<!-- css -->
<link rel="preload" href="style.css" onload="this.rel=stylesheet" />

<!-- script -->
<link
  rel="preload"
  as="script"
  href="async_script.js"
  onload="var script = document.createElement('script'); script.src = this.href; document.body.appendChild(script);"
/>
```
