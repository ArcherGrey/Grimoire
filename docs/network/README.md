# 网络

## tcp 三次握手 四次挥手

三次握手：

1. 客户端 发送 序号是 `i` 的 `syn` 包到服务器，进入 `SYN_SENT` 状态
2. 服务器 收到 返回序号是 `i+1` 的 `ASK`，表示客户端发送的请求收到，同时向客户端发送序号为 `j` 的 `syn` 包，进入 `SYN_RECV` 状态
3. 客户端 收到 返回序号是 `j+1` 的 `ASK`，表示客户端收到，此时客户端和服务器都进入 `ESTABLISHED` 状态，完成三次握手

四次挥手：

1. 客户端发送一个 `FIN`，用来关闭客户到服务器的数据传送。
2. 服务器收到这个 `FIN`，它发回一个 `ACK`，确认序号为收到的序号加 1。和 `SYN` 一样，一个 `FIN` 将占用一个序号。
3. 服务器关闭客户端的连接，发送一个 `FIN` 给客户端。
4. 客户端发回 `ACK` 报文确认，并将确认序号设置为收到序号加 1。

为什么是四次，因为 TCP 是全双工通信的

- 第一次挥手 因此当主动方发送断开连接的请求（即 FIN 报文）给被动方时，仅仅代表主动方不会再发送数据报文了，但主动方仍可以接收数据报文。
- 第二次挥手 被动方此时有可能还有相应的数据报文需要发送，因此需要先发送 ACK 报文，告知主动方“我知道你想断开连接的请求了”。这样主动方便不会因为没有收到应答而继续发送断开连接的请求（即 FIN 报文）。
- 第三次挥手 被动方在处理完数据报文后，便发送给主动方 FIN 报文；这样可以保证数据通信正常可靠地完成。发送完 FIN 报文后，被动方进入 LAST_ACK 阶段（超时等待）。
- 第四挥手 如果主动方及时发送 ACK 报文进行连接中断的确认，这时被动方就直接释放连接，进入可用状态。

## 安全

- dns 劫持：解析到错误的地址
  - 本地：木马病毒修改本地 hosts 文件，dns 缓存等
    - 防火墙 杀毒软件
  - 路由：修改路由器默认配置
    - 修改默认密码
  - 服务器：攻击 dns 服务器
    - 准备备用域名
- XSS 攻击
  - HttpOnly 防止劫取 Cookie
  - 用户的输入检查
  - 服务端的输出检查
- CSRF 攻击
  - 验证码
  - Referer Check
  - Token 验证

## 资源列表

- 接口调试
  - postman
- 模拟操作
  - Puppeteer [文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)
