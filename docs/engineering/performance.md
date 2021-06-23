# 总结

## 资源文件

- [预加载](/engineering/preload.html)
- [异步加载](/engineering/async.html)
- 静态资源使用 [CDN](/network/cdn.html)
- 服务器配置响应头，设置缓存
- 图片
  - 雪碧图
  - 图片图标替换为 `iconfont`:体积更小，缩放不失真
- 压缩
  - gzip
  - 代码混淆
- cdn 加载第三方模块

## 编码

- [简洁 JavaScript 代码](/lint/js_clean.html)
- 防抖截流
- vue
  - data 数据尽可能少，这样对应的数据劫持代价小
  - 循环渲染的子元素数据绑定使用事件代理 使用 key 减少 diff 开销
  - 需要缓存状态的使用 keep-alive
  - 尽可能使用 v-if 替代 v-show 避免首次渲染消耗
  - 使用 `addEventListene` 绑定的事件销毁需要在 `beforeDestroy` 手动销毁，避免内存泄漏
  - 长列表数据，纯展示不会有数据变化的不需要数据劫持来动态渲染可以使用 `object.freeze` 冻结对象

## 渲染

- 动画
  - setTimeout -> [requestAnimationFrame](/explorer/requestAnimationFrame.html)
- 懒加载
  - 图片懒加载
  - [路由懒加载](/engineering/router_lazy.html)
- 用户体验
  - pwa
  - 骨架屏

## 打包

- 第三方按需引用
- [sourcemap](/engineering/sourcemap.html)
