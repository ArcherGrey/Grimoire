# web 即时通讯

::: tip 概念
即时通讯技术就是：服务器端可以即时地将数据的更新或变化反应到客户端，例如消息即时推送等功能都是通过这种技术实现的。但是在 Web 中，由于浏览器的限制，实现即时通讯需要借助一些方法。这种限制出现的主要原因是，一般的 Web 通信都是浏览器先发送请求到服务器，服务器再进行响应完成数据的现实更新。
:::

## 短轮询

::: tip 思路
浏览器每隔一段时间向浏览器发送 http 请求，服务器端在收到请求后，不论是否有数据更新，都直接进行响应。这种方式实现的即时通信，本质上还是浏览器发送请求，服务器接受请求的一个过程，通过让客户端不断的进行请求，使得客户端能够模拟实时地收到服务器端的数据的变化
:::

优点：

- 简单

缺点：

- 对服务器压力大

不适合同时在线用户数量比较大而且注重性能的应用

```js
/* 利用定时器 */
var xhr = new XMLHttpRequest();
setInterval(function() {
  xhr.open("GET", "/user");
  xhr.onreadystatechange = function() {};
  xhr.send();
}, 1000);
```

## 长轮询

::: tip 原理
在服务器收到客户端请求后，不会直接响应，而是将请求挂起，等待数据更新的时候响应请求，如果一直没有更新在固定时间（服务器设置）后返回
:::

优点：

- 和短轮询比较减少了请求次数

缺点：

- 挂起连接也会导致资源占用

```js
function ajax() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/user");
  xhr.onreadystatechange = function() {
    ajax();
  };
  xhr.send();
}
```

## 长连接 `SSE`

`SSE` 是 `HTML5` 新增的功能，全称为 `Server-Sent Events`。它可以允许服务推送数据到客户端。`SSE` 在本质上就与之前的长轮询、短轮询不同，虽然都是基于 `http` 协议的，但是轮询需要客户端先发送请求。而 `SSE` 最大的特点就是不需要客户端发送请求，可以实现只要服务器端数据有更新，就可以马上发送到客户端。

`SSE` 的优势很明显，它不需要建立或保持大量的客户端发往服务器端的请求，节约了很多资源，提升应用性能。并且后面会介绍道，`SSE` 的实现非常简单，并且不需要依赖其他插件。

前端添加事件监听即可：

```js
const source = new EventSource("http://localhost:3000/test");

source.addEventListener(
  "open",
  () => {
    console.log("Connected");
  },
  false
);

source.addEventListener(
  "message",
  e => {
    console.log(e.data);
  },
  false
);

source.addEventListener(
  "pause",
  e => {
    source.close();
  },
  false
);
```

## websocket

`WebSocket` 是 `Html5` 定义的一个新协议，与传统的 `http` 协议不同，该协议可以实现服务器与客户端之间全双工通信。简单来说，首先需要在客户端和服务器端建立起一个连接，这部分需要 `http`。连接一旦建立，客户端和服务器端就处于平等的地位，可以相互发送数据，不存在请求和响应的区别。

特点

- 实现了双向通信
- 没有同源限制
- 建立在 tcp 协议之上
- http 升级协议

现在针对不同的后台语言有不同的插件可以使用。

- [详解](https://juejin.cn/post/6844903544978407431)
