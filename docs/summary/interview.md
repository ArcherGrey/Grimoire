# 面试总结

## 简历模板

- [全栈前端](https://hacknical.com/csvwolf/resume?locale=zh)

## vue

### 原理

- [响应式](/vue/reactivity.html)
  - defineProperty 和 proxy
  - nextTick 宏任务 微任务
    - [事件循环](/js/run.html)
  - [双向绑定](/engineering/databind.html)
- 模版编译
  - 解析生成 ast 遍历进行处理，将处理后的 ast 树转化微可执行代码
- [vdom diff](/vue/vdom.html)
- [路由](/engineering/route.html)
- [vuex](/vue/vuex.html)

### api

- [生命周期](/vue/life.html)
- v-if v-show 使用场景和区别
  - v-if
    - 是真正的条件渲染，会确保在切换过程中条件块内的事件监听器和组件被适当的销毁和重建
    - 惰性的，如果初始渲染条件为假那么什么都不会做，直到第一次条件为真的时候才会开始渲染
    - 更高的切换开销
  - v-show
    - 不管初始条件是什么总是会渲染，只是做简单的 css 切换
    - 更高的初始渲染开销
  - 频繁切换 使用 v-show，条件很少改变使用 v-if
- computed watch
  - computed 缓存 依赖值变化才重新计算
    - 场景 计算开销大
  - watch 监听 每次变化都执行回调
- data 组件里面返回一个函数
  - 组件复用多次，data 是对象可能会造成冲突，避免被共享，创建多个实例
- v-model 语法糖
  - 默认会利用名为 value 的 prop 和名为 input 的事件
- keep-alive 缓存组件状态 [文档](https://cn.vuejs.org/v2/api/#keep-alive)
- [组件通信](/vue/componentCom.html)

### 优化

[性能优化](/engineering/performance.html)

## react

- [受控和非受控](/react/controlled.html)
- fiber

## js

- [事件](/js/event.html)
- 类型判断
  - typeof
    - typeof null=object
    - 只能判断 基础类型和 object function
  - instanceof
    - 只能判断对象具体类型
    - 原理基于原型链 沿着左边的原型链直到找到和右边的显示原型相等的结果
- this
- 闭包
- for
  - for of 循环不仅支持数组、大多数伪数组对象，也支持字符串遍历，此外还支持 Map 和 Set 对象遍历。
  - for in 循环可以遍历字符串、对象、数组，不能遍历 Set/Map
  - forEach 循环不能遍历字符串、对象,可以遍历 Set/Map
- web worker 多线程 复杂计算/ service worker 离线存储 / shared work 共享进程
- 大量 div 渲染 - 虚拟列表 fiber
- es6
  - 块级作用域
    - let const
  - 扩展数组
  - 箭头函数 优缺点
  - 扩展运算符 ...
  - 解构
  - 模板字符串
  - class
  - promise
  - module

## css

- 浏览器渲染机制流程 重拍重绘 js css 加载顺序
- bfc
- 垂直居中
- 三列布局，中间宽度自适应（display：flex 实现）
- 页面渲染中遇到复杂计算造成的卡顿怎么解决？
  - 在引入 js 文件的 script 标签中加 defer 或者 async 实现异步加载
  - 开启一个 web worker 子线程来计算
- 定位
- 盒模型
- 浮动

## html

- 行内 块级标签
- doctype
- 语义
- 输入地址到加载流程

## 工程

- [前端路由](/engineering/route.html)
- 框架
  - 单向数据流 父组件向子组件传递 prop 反之不行，防止子组件意外改变父组件状态，导致数据流难以理解
  - vue react 区别 优缺点
  - antd 缺陷
- 防抖截流
- git
  - git reset
  - git revert
- webpack
  - [loader plugin](/engineering/loader_plugin.html)
  - [打包 优化](/engineering/webpack_build.html)
  - [原理 ast](/engineering/minipack.html)
- 图片懒加载
- [前端监控](/engineering/monitor.html)
- [sourcemap](/engineering/sourcemap.html)
- [性能优化]()
- [mvc mvvm](/engineering/mvx.html)

## 移动端

- 设计稿 1px 逻辑像素：实际物理像素 只有 0.5 px 无法正常显示
  - 媒体查询 + dpr + scale
  - viewport + rem + js

## 网络

- http
  - 版本
    - 1.1
      - 持久链接 keep-alive
        - 连接过多占用时间过长容易产生性能问题
      - 管道机制 同一个连接可以发送多个请求
        - 需要按序处理 队头任务如果太慢 可能导致队头阻塞
      - 增加缓存控制
      - 支持断点续传 Range
      - 虚拟网络 一台服务器可以存在多个虚拟主机共享 ip
      - 新增方法 put patch options delete
    - 2.0
      - 二进制分帧 头信息和数据都是二进制帧
      - 头部压缩 hpack 对头部阻断压缩
      - 多路复用 一个连接 客户端和浏览器可以同时发送多个请求和响应，不需要按序进行解决了对于队头阻塞的问题
      - 服务器推送
      - 请求优先级
  - 状态码
    - 200 OK 请求被服务器正确响应
    - 301 重定向
      - 域名更换
      - 路由重定向
    - 302 临时重定向
      - 网页快照
    - 304 协商缓存
    - 401 未授权
    - 404 页面不存在
    - 500 服务器错误
- https
- [websocket](/network/socket.html)
- [dns](/network/dns.html)
- 缓存策略
  - 强制缓存
  - 协商缓存
- [xss csrf](/network/xss.html)
- tcp 三次握手 四次挥手
- [网络安全汇总](/network/)
- [跨域](/network/crossdomain.html)
  - jsonp 原理
  - cors
  - 反向代理
  - postMessage
- 离线缓存
- [cookie session](/network/cookie.html)
- localstorage
- sessionstorage
- indexDB、memory cache、disk cache

## 手写

- 青蛙跳台阶问题 尾递归
- 旋转数组 189
  - 出栈 入队
  - 原始数组 : 1 2 3 4 5 6 7
    反转所有数字后 : 7 6 5 4 3 2 1
    反转前 k 个数字后 : 5 6 7 4 3 2 1
    反转后 n-k 个数字后 : 5 6 7 1 2 3 4 --> 结果
- 岛屿数量 200 深度优先遍历
- 875. 爱吃香蕉的珂珂 二分查找
- 数组链表区别
- 实现 Array.reduce()
- 实现 Promise/Promise.all()
- call bind apply
- 深拷贝
- 数组 并集 交集
- 冒泡 优化
- 快排
- 科里化

```js
function multiplication() {
  let args = Array.from(arguments);
  return function() {
    if (arguments[0] == undefined) {
      return args.reduce((pre, next) => pre * next);
    } else {
      return multiplication(...args.concat(Array.from(arguments)));
    }
  };
}
```

- 连续子数组的最大和
- 20. 有效的括号
- 2. 两数相加
- 415. 字符串相加
- 498. 对角线遍历
- 647. 回文
- 3. 无重复字符的最长子串
- 剑指 Offer 04. 二维数组中的查找
- n 叉树求最大深度
- 优先队列
- 多人编辑冲突

## 云计算

- serverless
  - faas 事件驱动
