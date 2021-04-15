# 响应式原理

::: tip 概述
响应式就是在修改数据对象的时候会触发视图更新
:::

## 追踪变化

::: tip 原理
Vue 会遍历 data 选项中所有 `property`，然后使用 `Object.defineProperty` 设置所有 `property` 的自定义 `getter/setter`，触发 `setter` 会通知 `watcher` 使得相关联的组件重新渲染
:::

<img :src="$withBase('/vue_responsive_1.png')" alt="追踪变化">

## 检测变化的特殊情况

### 对象

无法检测对象属性的添加或刪除，所以

1. 在初始化的时候声明：

```js
var vm = new Vue({
  data: {
    a: 1
  }
});

// `vm.a` 是响应式的

vm.b = 2;
// `vm.b` 是非响应式的
```

2. 添加单个属性，使用 `$set` 添加响应式属性：

```js
this.$set(this.someObject, "b", 2);
```

3. 添加多个属性，和原对象混合创建新的对象：

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 });
```

### 数组

`Vue` 不能检测以下数组的变动：

- 利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
  - 使用 `$set` 修改：`Vue.set(vm.items, indexOfItem, newValue)`
  - 使用 `splice`：`vm.items.splice(indexOfItem, 1, newValue)`
- 修改数组的长度时，例如：`vm.items.length = newLength`
  - 使用 `splice`: `vm.items.splice(newLength)`

## 异步更新队列

`Vue` 在更新 `DOM` 时是异步执行的：

1. 监听到数据变化
2. 开启队列
3. 缓存同一事件循环中发生的所有数据变更（同一个 `watcher` 多次触发只会被加入到队列一次）
4. 下一次事件循环 `tick` 中刷新队列执行去重后的任务

::: warning 注
`Vue` 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替
:::

如果想要基于更新后的 `DOM` 状态来做点什么，可以在数据变化之后立即使用 `Vue.nextTick(callback)`，这样回调函数将在 `DOM` 更新完成后被调用

(2.6 之前的版本)
`Vue.nextTick` 一般情况下是微任务,在处理事件绑定的时候是宏任务(事件冒泡可能导致顺序错误)

最新的冒泡做了特殊处理,所有都是微任务
