# 前端路由

::: tip 路由

根据不同的 url 返回对应的页面

:::

所有单页面应用 `spa` 路由都是基于前端路由实现的 （包括 `vue react`）

## hash

指的就是 `url` 里面 `#` 和后面的字符

`www.baidu.com/#123` 中就是 `#123`

`hash` 值变化不会导致浏览器向服务器发送请求，但是会触发 `hashchange` 事件

实现：

```js
class HashRouter {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", this.load.bind(this), false);
  }

  // 注册每个hash路由对应的页面
  register(hash, callback = () => {}) {
    this.routes[hash] = callback;
  }

  // 注册首页
  registerIndex(callback = () => {}) {
    this.routes["index"] = callback;
  }

  //用于处理视图未找到的情况
  registerNotFound(callback = function() {}) {
    this.routes["404"] = callback;
  }
  //用于处理异常情况
  registerError(callback = function() {}) {
    this.routes["error"] = callback;
  }

  // 加载页面
  load() {
    let hash = location.hash.slice(1); // 获取当前的 hash 路由
    let handler; // 路由对应的回调函数

    // 首页
    if (!hash) {
      handler = this.routes.index;
    }
    //未找到对应hash值
    else if (!this.routes.hasOwnProperty(hash)) {
      handler = this.routes["404"] || function() {};
    } else {
      handler = this.routes[hash];
    }

    //执行注册的回调函数
    try {
      handler.apply(this);
    } catch (e) {
      console.error(e);
      (this.routes["error"] || function() {}).call(this, e);
    }
  }
}
```

测试:

```html
<body>
  <div id="nav">
    <a href="#/page1">page1</a>
    <a href="#/page2">page2</a>
    <a href="#/page3">page3</a>
    <a href="#/page4">page4</a>
    <a href="#/page5">page5</a>
  </div>
  <div id="container"></div>
  <script>
    let router = new HashRouter();
    let container = document.getElementById("container");

    //注册首页回调函数
    router.registerIndex(() => (container.innerHTML = "我是首页"));

    //注册其他视图回到函数
    router.register("/page1", () => (container.innerHTML = "我是page1"));
    router.register("/page2", () => (container.innerHTML = "我是page2"));
    router.register("/page3", () => (container.innerHTML = "我是page3"));
    router.register("/page4", () => {
      throw new Error("抛出一个异常");
    });

    //加载视图
    router.load();
    //注册未找到对应hash值时的回调
    router.registerNotFound(() => (container.innerHTML = "页面未找到"));
    //注册出现异常时的回调
    router.registerError(
      e => (container.innerHTML = "页面异常，错误消息：<br>" + e.message)
    );
  </script>
</body>
```

## history

基于 `html5` 提供的 `History API`

`url` 改变只会有下面情况：

- 点击浏览器前进或者后退
- 点击 `a` 标签
- 在 `JS` 代码中触发 `history.pushState` 函数
- 在 `JS` 代码中触发 `history.replaceState` 函数

实现：

```js
class HistoryRouter {
  constructor() {
    //用于存储不同path值对应的回调函数
    this.routes = {};
    this.listenPopState();
    this.listenLink();
  }
  //监听popstate
  listenPopState() {
    window.addEventListener(
      "popstate",
      e => {
        let state = e.state || {},
          path = state.path || "";
        this.dealPathHandler(path);
      },
      false
    );
  }
  //全局监听A链接
  listenLink() {
    window.addEventListener(
      "click",
      e => {
        let dom = e.target;
        if (dom.tagName.toUpperCase() === "A" && dom.getAttribute("href")) {
          e.preventDefault();
          this.assign(dom.getAttribute("href"));
        }
      },
      false
    );
  }
  //用于首次进入页面时调用
  load() {
    let path = location.pathname;
    this.dealPathHandler(path);
  }
  //用于注册每个视图
  register(path, callback = function() {}) {
    this.routes[path] = callback;
  }
  //用于注册首页
  registerIndex(callback = function() {}) {
    this.routes["/"] = callback;
  }
  //用于处理视图未找到的情况
  registerNotFound(callback = function() {}) {
    this.routes["404"] = callback;
  }
  //用于处理异常情况
  registerError(callback = function() {}) {
    this.routes["error"] = callback;
  }
  //跳转到path
  assign(path) {
    history.pushState({ path }, null, path);
    this.dealPathHandler(path);
  }
  //替换为path
  replace(path) {
    history.replaceState({ path }, null, path);
    this.dealPathHandler(path);
  }
  //通用处理 path 调用回调函数
  dealPathHandler(path) {
    let handler;
    //没有对应path
    if (!this.routes.hasOwnProperty(path)) {
      handler = this.routes["404"] || function() {};
    }
    //有对应path
    else {
      handler = this.routes[path];
    }
    try {
      handler.call(this);
    } catch (e) {
      console.error(e);
      (this.routes["error"] || function() {}).call(this, e);
    }
  }
}
```

测试：

```html
<body>
  <div id="nav">
    <a href="/page1">page1</a>
    <a href="/page2">page2</a>
    <a href="/page3">page3</a>
    <a href="/page4">page4</a>
    <a href="/page5">page5</a>
    <button id="btn">page2</button>
  </div>
  <div id="container"></div>
  <script>
    let router = new HistoryRouter();
    let container = document.getElementById("container");

    //注册首页回调函数
    router.registerIndex(() => (container.innerHTML = "我是首页"));

    //注册其他视图回到函数
    router.register("/page1", () => (container.innerHTML = "我是page1"));
    router.register("/page2", () => (container.innerHTML = "我是page2"));
    router.register("/page3", () => (container.innerHTML = "我是page3"));
    router.register("/page4", () => {
      throw new Error("抛出一个异常");
    });

    document.getElementById("btn").onclick = () => router.assign("/page2");

    //注册未找到对应path值时的回调
    router.registerNotFound(() => (container.innerHTML = "页面未找到"));
    //注册出现异常时的回调
    router.registerError(
      e => (container.innerHTML = "页面异常，错误消息：<br>" + e.message)
    );
    //加载页面
    router.load();
  </script>
</body>
```

::: warning 注

`history` 模式在修改 `url` 后页面不会刷新，但是如果手动刷新或者输入 `url`，前端无法拦截请求，会向服务器请求页面，服务器需要配置对应资源

:::

## 比较

hash:

- 兼容性更好，可以到 `IE8`
- 无需服务端配合

history:

- `url` 看起来更好看
- 需要后端对应配置
