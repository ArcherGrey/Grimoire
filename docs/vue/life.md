# 生命周期

## vue 的生命周期各阶段都做了什么？

- `beforeCreate` 实例创建前：这个阶段实例的 `data、methods` 是读不到的
- `created` 实例创建后：这个阶段已经完成了数据绑定(`data observer`)，属性和方法的运算， `watch/event` 事件回调。`mount` 挂载阶段还没开始，`$el` 属性目前不可见，数据并没有在 `DOM` 元素上进行渲染
- `beforeMount`：在挂载开始之前被调用：相关的 `render` 函数首次被调用。
- `mounted`：`el` 选项的 `DOM` 节点 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用此生命周期函数。此时实例的数据在 DOM 节点上进行渲染
- `beforeUpdate` 数据更新时调用，但不进行 DOM 重新渲染，在数据更新时 DOM 没渲染前可以在这个生命函数里进行状态处理
- `updated`：这个状态下数据更新并且 DOM 重新渲染，当这个生命周期函数被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。当实例每次进行数据更新时 updated 都会执行
- beforeDestory：实例销毁之前调用。
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

---

vue 生命周期在真实场景下的业务应用：

1. created：进行 ajax 请求异步数据的获取、初始化数据
2. mounted：挂载元素内 dom 节点的获取
3. nextTick：针对单一事件更新数据后立即操作 dom
4. updated：任何数据的更新，如果要做统一的业务逻辑处理
5. watch：监听具体数据变化，并做相应的处理

## 流程表

| 顺序 |                                                             调用时间                                                             |      名称       |
| :--: | :------------------------------------------------------------------------------------------------------------------------------: | :-------------: |
|  1   |                                      初始化 `vue` 实例 ， 数据绑定 `event watcher` 配置之前                                      | `beforeCreate`  |
|  2   |                                 实例创建完成之后，数据绑定 `prop watch/event` 完成，`$el` 不可用                                 |    `created`    |
|  3   |                                 挂载开始之前，`render` 函数首次被调用（服务器渲染期间不被调用）                                  |  `beforeMount`  |
|  4   | 实例被挂载后（不能保证所有子组件都完成挂载，如果要等到整个视图都渲染完毕，可以在内部使用 `$nextTick`）（服务器渲染期间不被调用） |    `mounted`    |
|  5   |                                           虚拟 dom 更新之前（服务器渲染期间不被调用）                                            | `beforeUpdate`  |
|  6   |                      完成 dom 更新（服务器渲染期间不被调用）必避免在此阶段修改状态 ，使用 `watch computed`                       |
|  7   |                                     实例销毁之前，这里实例依然可用（服务器渲染期间不被调用）                                     | `beforeDestroy` |
|  8   |                              实例销毁后，所有事件监听所有子组件都被销毁 （服务器渲染期间不被调用）                               |   `destroyed`   |

## 调用顺序

类似事件触发：捕获-目标-冒泡 `=>` 父组件-子组件-父组件

父组件 `P`
子组件 `S`

- 加载过程：
  1. P-beforeCreate
  2. P-created
  3. P-beforeMount
  4. S-beforeCreate
  5. S-created
  6. S-beforeMount
  7. S-mounted
  8. P-mounted
- 子组件更新
  1. P-beforeUpdate
  2. S-beforeUpdate
  3. S-updated
  4. P-updated
- 父组件更新
  1. P-beforeUpdate
  2. P-updated
- 销毁过程
  1. P-beforeDestroy
  2. S-beforeDestroy
  3. S-destroyed
  4. P-destroyed
