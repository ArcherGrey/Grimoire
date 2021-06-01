# `computed`

## 和 `watch` 差异

- `computed` 是生成一个新的属性挂载到实例上，`watch` 是监听已经存在且挂载到实例上的数据，所以 `watch` 也可以监听 `computed` 属性变化
- `computed` 具有缓存，只有依赖变化才会重新计算
- `computed` 适合一个数据被多个数据影响，`watch` 适合要给数据影响多个数据

## 原理

- 依赖变化，修改脏数据标志为真，但不会立即重新计算，只有在访问计算属性的时候，才会重新计算或读取缓存，有懒计算特性

## 流程

1. 响应式的值 `count` 更新
2. 同时通知 `computed watcher` 和 渲染 `watcher` 更新
3. `computed watcher` 把 `dirty` 设置为 `true`
4. 视图渲染读取到 `computed` 的值，由于 `dirty` 所以 `computed watcher` 重新求值。

不缓存：

1. `count` 改变，先通知到 计算 `watcher` 更新，设置 `dirty = true`
2. 再通知到 渲染 `watcher` 更新，视图重新渲染的时候去 计算 `watcher` 中读取值，发现 `dirty` 是 `true`，重新执行用户传入的函数求值。

缓存：

1. `other` 改变，直接通知 渲染 `watcher` 更新。
2. 视图重新渲染的时候去 计算 `watcher` 中读取值，发现 `dirty` 为 `false`，直接用缓存值 `watcher.value`，不执行用户传入的函数求值。
