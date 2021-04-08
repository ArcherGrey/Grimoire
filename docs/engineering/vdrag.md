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

触发 `drop` 事件时，使用 `dataTransfer.getData()` 接收传输过来的索引数据，然后根据索引找到对应的组件数据，再添加到画布，从而渲染组件。

### 组件在画布中移动

首先需要将画布设为相对定位 `position: relative`，然后将每个组件设为绝对定位 `position: absolute`。除了这一点外，还要通过监听三个事件来进行移动：

1. `mousedown` 事件，在组件上按下鼠标时，记录组件当前的位置，即 `xy` 坐标
2. `mousemove` 事件，每次鼠标移动时，都用当前最新的 `xy` 坐标减去最开始的 `xy` 坐标，从而计算出移动距离，再改变组件位置
3. `mouseup` 事件，鼠标抬起时结束移动。

::: demo vue

<template>
  <div class="content-wrap">
    <!-- 组件列表 -->
    <div @dragstart="handleDragStart" class="component-list">
      <div
        v-for="(item, index) in componentList"
        :key="index"
        class="list"
        draggable
        :data-index="index"
      >
        <!-- 自定义组件 -->
        <span>{{ item.label }}</span>
      </div>
    </div>
    <!-- 画板 -->
    <div
      class="content"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @mousedown="handleMouseDown"
      ref="content"
    >
      <div
        v-for="(item, index) in componentData"
        :key="index"
        class="list"
        :data-index="index"
        :style="item.style"
      >
        <!-- 自定义组件 -->
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentList: [
        {
          label: "文本1"
        },
        {
          label: "文本2"
        },
        {
          label: "文本3"
        }
      ],
      componentData: [],
      operation: ""
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
      this.operation = "drag";
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      // 拖拽的组件
      let selected = this.componentList[e.dataTransfer.getData("index")];
      if (!selected) return false;
      const component = JSON.parse(JSON.stringify(selected));
      component.style = {
        top: e.offsetY + "px",
        left: e.offsetX + "px"
      };
      const tmp = [...this.componentData, component];
      // 把组件信息加入到画布组件信息队列中
      this.$set(this, "componentData", tmp);
    },
    handleDragOver(e) {
      // 需要这样设置才能触发 drop
      // 1. 屏蔽默认事件
      // 2. 设置 dropEffect = copy
      e.preventDefault();
      if (this.operation === "drag") e.dataTransfer.dropEffect = "copy";
      if (this.operation === "move") {
        return false;
      }
    },
    handleMouseDown(e) {
      e.stopPropagation();
      this.operation = "move";
      // 移动选中的组件
      let selected = this.componentData[e.target.parentNode.dataset.index];
      if (!selected) return false;
      const component = JSON.parse(JSON.stringify(selected));
      const pos = component.style;
      const startY = e.clientY;
      const startX = e.clientX;
      const startTop = Number(pos.top.replace("px", ""));
      const startLeft = Number(pos.left.replace("px", ""));

      // mousemove 修改位置
      const move = moveEvent => {
        const currX = moveEvent.clientX;
        const currY = moveEvent.clientY;
        pos.top = currY - startY + startTop;
        pos.left = currX - startX + startLeft;
        // 修改当前组件样式
        selected.style = {
          top: pos.top + "px",
          left: pos.left + "px"
        };
      };

      // mouseup 解除事件绑定
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  }
};
</script>

<style scoped>
.content-wrap {
  display: flex;
  flex-direction: row;
}
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  height: 200px;
  width: 100px;
  border: 1px solid lightblue;
}
.content {
  height: 200px;
  flex: 1;
  border: 1px solid lightblue;
  padding: 10px;
  margin-left: 10px;
  position: relative;
}
.list {
  height: fit-content;
  width: fit-content;
  border: 1px solid grey;
  cursor: grab;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content .list{
  position: absolute;
}
</style>

:::
