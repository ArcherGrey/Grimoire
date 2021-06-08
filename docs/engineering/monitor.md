# 前端监控

## 数据采集

- 性能数据采集 `window.performance API`
- 错误数据采集
  - 资源加载错误 `addEventListener('error', callback, true)` 捕获阶段监听加载失败
  - js 执行错误 `window.onerror`
  - promise `addEventListener('unhandledrejection', callback)` 需要手动抛出错误

## 数据上报

`navigator.sendBeacon()` 使用户代理（浏览器）在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。
