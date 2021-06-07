# 跨域 (待补充)

## 概念

同源策略是一个重要的安全策略，它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

浏览器的同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。

同源指：协议、域名、端口号必须一致，跨域也就是非同源请求。

浏览器并不是拒绝所有跨域请求：

- 允许跨域写操作 `cross-origin writes`
  - 链接 `links`
  - 重定向
  - 表单提交
  - 特定少数的 HTTP 请求需要添加 preflight。
- 允许跨域资源嵌入 `Cross-origin embedding`
  - `<script src="..."></script>`标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
  - `<link rel="stylesheet" href="...">` 标签嵌入 `CSS`。由于 `CSS` 的松散的语法规则，`CSS` 的跨域需要一个设置正确的 `Content-Type` 消息头，不同浏览器有不同的限制
  - `<img>` 嵌入图片。支持的图片格式包括 `PNG,JPEG,GIF,BMP,SVG`
  - `<video>` 和 `<audio>` 嵌入多媒体资源。
  - `<object>, <embed>` 和 `<applet>` 的插件。
  - `@font-face` 引入的字体。一些浏览器允许跨域字体（ `cross-origin fonts`），一些需要同源字体（`same-origin fonts`）。
  - `<frame>` 和 `<iframe>` 载入的任何资源。站点可以使用 `X-Frame-Options` 消息头来阻止这种形式的跨域交互。
- 不允许跨域读操作（`Cross-origin reads`）。但常可以通过内嵌资源来巧妙的进行读取访问。例如可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或 `availability of an embedded resource`.

场景：工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能需要对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域。

## 解决方案

### JSONP

::: tip 原理
虽然因为同源策略的影响，不能通过 `XMLHttpRequest` 请求不同域上的数据（`Cross-origin reads`）。但是，在页面上引入不同域上的 `js` 脚本文件却是可以的（`Cross-origin embedding`）。因此在 `js` 文件载入完毕之后，触发回调，可以将需要的 `data` 作为参数传入。
:::

代码：

```js
// 前端
// index.html
function jsonp({ url, param, cb }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[cb] = function(data) {
      resolve(data);
      document.body.removeChild(script);
    };
    params = { ...params, cb };
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join("&")}`;
    document.body.appendChild(script);
  });
}
jsonp({
  url: "http://localhost:3000/say",
  params: { wd: "haoxl" },
  cb: "show"
}).then(data => {
  console.log(data);
});

// 后端
//server.js
let express = require("express");
let app = express();
app.get("/say", function(req, res) {
  let { wd, cb } = req.query;
  console.log(wd);
  res.end(`${cb}('hello')`);
});
app.listen(3000);
```

优点：

- 兼容性好

缺点：

- 只支持 `GET`
- 不安全，容易受 `xss` 攻击
- 没有对应的错误处理机制

### CORS

`CORS` 是 `W3C` 推荐的一种新的官方方案，能使服务器支持 `XMLHttpRequest` 的跨域请求。`CORS` 实现起来非常方便，只需要增加一些 `HTTP` 头，让服务器能声明允许的访问来源。

通常使用 `CORS` 时，异步请求会被分为简单请求和非简单请求，非简单请求的区别是会先发一次预检请求。

- 简单请求
  - `GET`
  - `HEAD`
  - `POST Content-Type` 为下面情况
    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`
- 非简单请求
  - 使用了下面任一 `HTTP` 方法
    - `PUT`
    - `DELETE`
    - `CONNECT`
    - `OPTIONS`
    - `TRACE`
    - `PATCH`
  - 设置了对 `CORS` 安全的首部字段集合之外的其他首部字段
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type (but note the additional requirements below)`
    - `DPR`
    - `Downlink`
    - `Save-Data`
    - `Viewport-Width`
    - `Width`
  - `POST` 不含简单请求的 `Content-Type`

### 反向代理

- 正向代理：客户端知道最终访问的服务器，服务器无法感知具体的客户端，例子：科学上网
- 反向代理：客户端不知道最终访问的服务器，通过代理服务器转发请求，例子：解决跨域

`nodejs`:

```js
/* 前端 */
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open("get", "http://www.domain1.com:3000/login?user=admin", true);
xhr.send();

/* nodejs */
var express = require("express");
var proxy = require("http-proxy-middleware");
var app = express();

app.use(
  "/",
  proxy({
    // 代理跨域目标接口
    target: "http://www.domain2.com:8080",
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
      res.header("Access-Control-Allow-Origin", "http://www.domain1.com");
      res.header("Access-Control-Allow-Credentials", "true");
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: "www.domain1.com" // 可以为false，表示不修改
  })
);

app.listen(3000);
console.log("Proxy server is listen at port 3000...");
```

修改配置 `nginx.conf`:

```txt
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}

```
