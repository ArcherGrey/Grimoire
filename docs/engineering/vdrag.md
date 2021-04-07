# 可视化拖拽组件

基于 `vue`

## 布局

整体页面布局：

- 工具栏：快捷操作
- 组件列表：可以生成的组件
- 画布：dashboard 用来放置组件
- 属性编辑区域：修改组件属性

<img :src="$withBase('/eng_vdrag_1.png')" alt="布局">

思路：

1. 用一个数组 `componentData` 维护画布上的组件数据
2. 拖拽组件到画布上，使用 `push` 将组件的数据加入到 `componentData`
3. 使用动态组件和 `v-for` 来把 `componentData` 中到组件渲染上去

动态组件：

```vue
<component
  v-for="item in componentData"
  :key="item.id"
  :is="item.component"
  :style="item.style"
  :propValue="item.propValue"
/>
```

`componentData`:

```json
{
  "component": "v-text", // 组件名称，需要提前注册到 Vue
  "label": "文字", // 左侧组件列表中显示的名字
  "propValue": "文字", // 组件所使用的值
  "icon": "el-icon-edit", // 左侧组件列表中显示的名字
  "animations": [], // 动画列表
  "events": {}, // 事件列表
  "style": {
    // 组件样式
    "width": 200,
    "height": 33,
    "fontSize": 14,
    "fontWeight": 500,
    "lineHeight": "",
    "letterSpacing": 0,
    "textAlign": "",
    "color": ""
  }
}
```

## 拖拽

### 从组件列表到画布

思路：

1. `dragstart` 开始拖拽将组件信息缓存
2. `drop` 拖拽结束将缓存信息加入到 `componentData`

左侧组件列表：

```vue
<div @dragstart="handleDragStart" class="component-list">
  <div
    v-for="(item, index) in componentList"
    :key="index"
    class="list"
    draggable
    :data-index="index"
  >
    <i :class="item.icon"></i>
    <span>{{ item.label }}</span>
  </div>
</div>
```

```js
handleDragStart(e) {
    e.dataTransfer.setData('index', e.target.dataset.index)
}
```

画布区域：

```vue
<div
  class="content"
  @drop="handleDrop"
  @dragover="handleDragOver"
  @click="deselectCurComponent"
>
  <Editor />
</div>
```

```js
handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const component = deepCopy(componentList[e.dataTransfer.getData('index')])
    this.$store.commit('addComponent', component)
}
```

触发 `drop` 事件时，使用 `dataTransfer.getData()` 接收传输过来的索引数据，然后根据索引找到对应的组件数据，再添加到画布，从而渲染组件。

### 组件在画布中移动
