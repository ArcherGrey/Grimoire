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

::: demo

```html
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

<style>
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

  .content .list {
    position: absolute;
  }
</style>
```

:::

## 删除组件，调整图层

由于拖拽组件到画布中是有先后顺序的，所以可以按照数据顺序来分配图层层级。
例如画布新增了五个组件 `abcde`，那它们在画布数据中的顺序为 `[a, b, c, d, e]`，图层层级和索引一一对应，即它们的 `z-index` 属性值是 `01234`（后来居上）：

```vue
<div v-for="(item, index) in componentData" :zIndex="index"></div>
```

改变图层层级，即是改变组件数据在 `componentData` 数组中的顺序。例如有 `[a, b, c]` 三个组件，它们的图层层级从低到高顺序为 `abc`（索引越大，层级越高）。

删除组件也是把组件信息从组件队列中删除：

```js
componentData.splice(index, 1);
```

::: demo

```vue
<template>
  <!-- 画板 -->
  <div
    class="content"
    @mousedown="handleMouseDown"
    ref="content"
    @click="showMenu = false"
  >
    <div
      v-for="(item, index) in componentData"
      :key="index"
      class="list"
      :data-index="index"
      :style="Object.assign(item.style, { zIndex: index })"
      @contextmenu="handleMenu"
    >
      <!-- 自定义组件 -->
      <span>{{ item.label }}</span>
    </div>
    <div class="menu" v-show="showMenu" :style="menuPos" @click="handleCommand">
      <div data-command="up">上移</div>
      <div data-command="down">下移</div>
      <div data-command="bottom">置底</div>
      <div data-command="top">置顶</div>
      <div data-command="delete">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentData: [
        {
          style: {
            top: "0",
            left: "0",
            background: "lightblue"
          },
          label: "文本1"
        },
        {
          style: {
            top: "20px",
            left: "10px",
            background: "lightgrey"
          },
          label: "文本2"
        },
        {
          style: {
            top: "40px",
            left: "20px",
            background: "lightgreen"
          },
          label: "文本3"
        }
      ],
      showMenu: false,
      menuPos: {},
      currentComponent: null
    };
  },
  methods: {
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
          left: pos.left + "px",
          background: pos.background
        };
      };

      // mouseup 解除事件绑定
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    handleMenu(e) {
      e.preventDefault();
      this.currentComponent = e.currentTarget.dataset.index;
      this.menuPos = {
        top: e.offsetY + "px",
        left: e.offsetX + "px"
      };
      this.showMenu = true;
    },
    handleCommand(e) {
      const command = e.target.dataset.command;
      const len = this.componentData.length - 1;
      const tmp = [...this.componentData];
      const curIndex = +this.currentComponent;
      switch (command) {
        case "up":
          if (curIndex != len) {
            [tmp[curIndex + 1], tmp[curIndex]] = [
              tmp[curIndex],
              tmp[curIndex + 1]
            ];
            this.$set(this, "componentData", tmp);
          }
          break;
        case "down":
          if (curIndex != 0) {
            [tmp[curIndex - 1], tmp[curIndex]] = [
              tmp[curIndex],
              tmp[curIndex - 1]
            ];
            this.$set(this, "componentData", tmp);
          }
          break;
        case "bottom":
          if (curIndex != 0) {
            tmp.unshift(...tmp.splice(curIndex, 1));
            this.$set(this, "componentData", tmp);
          }
          break;
        case "top":
          if (curIndex != len) {
            tmp.push(...tmp.splice(curIndex, 1));
            this.$set(this, "componentData", tmp);
          }
          break;
        case "delete":
          tmp.splice(curIndex, 1);
          this.$set(this, "componentData", tmp);
          break;
      }
    }
  }
};
</script>

<style>
.content {
  height: 200px;
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

.content .list {
  position: absolute;
}
.menu {
  border: 1px solid #000;
  width: fit-content;
  z-index: 999;
  position: absolute;
  background: lightcyan;
}
.menu div {
  border: 1px solid #000;
  cursor: pointer;
  padding: 0 3px;
}
.menu div:hover {
  background: lightblue;
}
</style>
```

:::

## 放大缩小

选中画布上的组件，组件外圈会出现 8 个小圆点可以拖动进行放大缩小。

思路：

1. 每个组件外层包裹一层组件，包裹组件包含 8 个小圆点和插槽，插槽用来放置组件

```vue
<!--页面组件列表展示-->
<Shape
  v-for="(item, index) in componentData"
  :defaultStyle="item.style"
  :style="getShapeStyle(item.style, index)"
  :key="item.id"
  :active="item === curComponent"
  :element="item"
  :zIndex="index"
>
    <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
    />
</Shape>
```

组件内部：

```vue
<template>
  <div
    class="shape"
    :class="{ active: this.active }"
    @click="selectCurComponent"
    @mousedown="handleMouseDown"
    @contextmenu="handleContextMenu"
  >
    <div
      class="shape-point"
      v-for="(item, index) in active ? pointList : []"
      @mousedown="handleMouseDownOnPoint(item)"
      :key="index"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>
```

2. 点击组件通过样式控制显示小圆点
3. 计算每个小圆点的位置（要显示在组件外层，还需要计算小圆点的大小，记小圆点长宽都为 `w`）：

- 左上 `left:0-w top:0-w`
- 右上 `left:width top:0-w`
- 左下 `left:0-w top:height`
- 右下 `left:width top:height`
- 中间的点 `width/2 height/2` 同理计算

4. 点击小圆点可以进行缩放操作

- 点击小圆点，记录初始坐标
- 向下拖动就用新的 y 坐标减去初始坐标可以得到移动距离，再把距离加上组件的高度计算得到新的高度(用 `movement` 鼠标移动距离也可以计算)
- 上下只能修改高度 左右只能修改宽度，西北方向特殊处理,需要限制对应圆点的功能

::: demo

```vue
<template>
  <!-- 画板 -->
  <div class="content" @click="selected = null">
    <!-- 模拟外层包裹组件 -->
    <div
      v-for="(item, index) in componentData"
      :key="index"
      class="component"
      :style="item.style"
      :data-index="index"
      @click="
        e => {
          e.stopPropagation();
          selected = index;
        }
      "
    >
      <!-- 自定义组件 -->
      <div>自定义组件</div>
      <div
        class="dots"
        v-for="(dot, i) in dots"
        :key="i"
        :style="{
          left: dot[0] + 'px',
          top: dot[1] + 'px',
          width: dotSize + 'px',
          height: dotSize + 'px',
          cursor: dot[2]
        }"
        @mousedown="handleMouseDown"
        :data-type="dot[2].split('-')[0]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentData: [
        {
          style: {
            top: "30px",
            left: "30px",
            height: "100px",
            width: "100px",
            background: "lightblue"
          }
        }
      ],
      selected: null,
      dotSize: 4
    };
  },
  methods: {
    handleMouseDown(e) {
      const component = this.componentData[this.selected];
      const type = e.target.dataset.type;
      const move = me => {
        let t = { ...component.style };
        // 东西方向能修改宽度
        if (type.indexOf("e") > -1)
          t.width = Number(t.width.replace("px", "")) + me.movementX + "px";
        // 南北方向能修改高度
        if (type.indexOf("s") > -1)
          t.height = Number(t.height.replace("px", "")) + me.movementY + "px";
        // 西北方向需要修改 left top 宽高修改相反
        if (type.indexOf("w") > -1) {
          t.left = Number(t.left.replace("px", "")) + me.movementX + "px";
          t.width = Number(t.width.replace("px", "")) - me.movementX + "px";
        }
        if (type.indexOf("n") > -1) {
          t.top = Number(t.top.replace("px", "")) + me.movementY + "px";
          t.height = Number(t.height.replace("px", "")) - me.movementY + "px";
        }
        this.$set(this.componentData[this.selected], "style", t);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  },
  computed: {
    dots() {
      if (this.selected !== null) {
        const component = this.componentData[this.selected];
        const width = +component.style.width.replace("px", "");
        const height = +component.style.height.replace("px", "");
        return [
          [0 - this.dotSize, 0 - this.dotSize, "nw-resize"],
          [0 - this.dotSize, height, "sw-resize"],
          [width, 0 - this.dotSize, "ne-resize"],
          [width, height, "se-resize"],
          [width / 2, 0 - this.dotSize, "n-resize"],
          [width / 2, height, "s-resize"],
          [0 - this.dotSize, height / 2, "w-resize"],
          [width, height / 2, "e-resize"]
        ];
      }
      return [];
    }
  }
};
</script>

<style>
.content {
  height: 200px;
  flex: 1;
  border: 1px solid lightblue;
  padding: 10px;
  margin-left: 10px;
  position: relative;
}

.component {
  position: absolute;
  height: fit-content;
  width: fit-content;
  text-align: center;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dots {
  border: 1px solid lightblue;
  position: absolute;
}
</style>
```

:::

## 撤销 重做

用一个数组来保存编辑器的快照数据。保存快照就是将当前的编辑器数据推入 `snapshotData` 数组，并增加快照索引 `snapshotIndex`。目前以下几个动作会触发保存快照操作：

- 新增组件
- 删除组件
- 改变图层层级
- 拖动组件结束时

```js
// snapshotData: [], // 编辑器快照数据
// snapshotIndex: -1, // 快照索引

undo(state) {
    if (state.snapshotIndex >= 0) {
        state.snapshotIndex--
        store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]))
    }
},

redo(state) {
    if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++
        store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]))
    }
},

setComponentData(state, componentData = []) {
    Vue.set(state, 'componentData', componentData)
},

recordSnapshot(state) {
    // 添加新的快照
    state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData)
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
    }
},

```

- 撤销 就是将快照索引减一，更新索引指向数据给画布
  - 撤销后做了新的操作就把新的快照数据加入数组，更新索引
- 重做 就是快照索引加一，更新索引指向数据给画布

## 吸附 对齐

参考 `Sketch` 墨刀

<img :src="$withBase('/eng_vdrag_2.png')" alt="标线">

可以看到，一个组件在画布中可以由 6 条线 `(vt / vm / vb | hl / hm / hr)` 来表示，组件移动过程中的对齐其实就是组件的 6 条线到其它组件线的集合中寻找临近线，找到后考虑 吸附 + 对齐 的过程。

对齐吸附：横向左移动为例，它的 `hl / hm / hr` 会不断的去查找与这 3 条线相邻最近的线。

- 当没有找到相邻线时，组件跟随鼠标移动
- 当初次找到时，组件便移动一个较大距离吸附过去
- 当在吸附线上再次移动时，继续查找相邻线，看是否有下一条吸附线
  - 如果有，则移动到下一条吸附线上
  - 如果没有，则在鼠标移动一定距离后，组件离开

具体：

- 向下移动
  - 显示水平线

::: demo

```vue
<template>
  <!-- 画板 -->
  <div class="content" @click="selected = null">
    <!-- 模拟外层包裹组件 -->
    <div
      v-for="(item, index) in componentData"
      :key="index"
      class="component"
      :style="item.style"
      :data-index="index"
      @mousedown="handleMouseDown"
    >
      <!-- 自定义组件 -->
      <div>自定义组件</div>
    </div>

    <!-- 标线 -->
    <div class="mark-line">
      <div
        v-for="line in lines"
        :key="line"
        class="line"
        :class="line.includes('x') ? 'xline' : 'yline'"
        :ref="line"
        v-show="lineStatus[line] || false"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentData: [
        {
          style: {
            top: "0",
            left: "0",
            width: "100px",
            height: "100px",
            background: "lightblue"
          }
        },
        {
          style: {
            top: "100px",
            left: "100px",
            width: "100px",
            height: "100px",
            background: "lightgrey"
          }
        }
      ],
      currentComponent: null,
      lines: ["xt", "xc", "xb", "yl", "yc", "yr"], // 分别对应三条横线和三条竖线
      diff: 5, // 相距 dff 像素将自动吸附
      lineStatus: {
        xt: false, // 水平顶部
        xc: false, // 水平中间
        xb: false, // 水平底部
        yl: false, // 垂直左边
        yc: false, // 垂直中间
        yr: false // 垂直右边
      }
    };
  },
  methods: {
    hideLine() {
      Object.keys(this.lineStatus).forEach(line => {
        this.lineStatus[line] = false;
      });
    },
    showLine(currentComponent, index, top, left, toDown, toLeft) {
      console.log("left:" + left);
      console.log("top:" + top);
      const rest = this.componentData.filter(c => c != currentComponent)[0];
      const rwidth = +rest.style.width.replace("px", "");
      const rheight = +rest.style.height.replace("px", "");
      const rtop = +rest.style.top.replace("px", "");
      const rleft = +rest.style.left.replace("px", "");
      const width = +currentComponent.style.width.replace("px", "");
      const height = +currentComponent.style.height.replace("px", "");
      this.hideLine();
      const lines = this.$refs;
      let changeLeft, changeTop;

      // 上下移动
      if (toDown) {
        if (Math.abs(top - rtop) <= this.diff) {
          this.lineStatus.xt = true;
          lines.xt[0].style.left = 0;
          lines.xt[0].style.top = top + "px";
          changeTop = rtop;
        }
        if (Math.abs(top + height - (rtop + rheight)) <= this.diff) {
          this.lineStatus.xb = true;
          lines.xb[0].style.left = 0;
          lines.xb[0].style.top = top + height + "px";
          changeTop = rtop;
        }
        if (Math.abs(top + height / 2 - (rtop + rheight / 2)) <= this.diff) {
          this.lineStatus.xc = true;
          lines.xc[0].style.left = 0;
          lines.xc[0].style.top = top + height / 2 + "px";
          changeTop = rtop;
        }
      }
      // 左右移动
      if (toLeft) {
        if (Math.abs(left - rleft) <= this.diff) {
          this.lineStatus.yl = true;
          lines.yl[0].style.left = left + "px";
          lines.yl[0].style.top = 0;
          changeLeft = rleft;
        } else if (Math.abs(left + width - (rleft + rwidth)) <= this.diff) {
          this.lineStatus.yr = true;
          lines.yr[0].style.left = left + width + "px";
          lines.yr[0].style.top = 0;
          changeLeft = rleft;
        } else if (
          Math.abs(left + width / 2 - (rleft + rwidth / 2)) <= this.diff
        ) {
          this.lineStatus.yc = true;
          lines.yc[0].style.left = left + width / 2 + "px";
          lines.yc[0].style.top = 0;
          changeLeft = rleft;
        }
      }

      const style = currentComponent.style;
      if (changeLeft != undefined) {
        this.$set(this.componentData, index, {
          style: Object.assign(style, {
            left: changeLeft + "px"
          })
        });
      }
      if (changeTop != undefined) {
        this.$set(this.componentData, index, {
          style: Object.assign(style, {
            top: changeTop + "px"
          })
        });
      }
    },
    handleMouseDown(e) {
      e.stopPropagation();
      // 移动选中的组件
      let selected = this.componentData[e.target.dataset.index];
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
        const toDown = currY - startY > 0 ? true : false;
        const toLeft = currX - startX > 0 ? true : false;
        pos.top = currY - startY + startTop;
        pos.left = currX - startX + startLeft;

        this.showLine(
          selected,
          e.target.dataset.index,
          pos.top,
          pos.left,
          toDown,
          toLeft
        );
        // 修改当前组件样式
        selected.style = {
          top: pos.top + "px",
          left: pos.left + "px",
          background: pos.background,
          width: pos.width,
          height: pos.height
        };
      };

      // mouseup 解除事件绑定
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        this.hideLine();
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  }
};
</script>

<style>
.content {
  height: 200px;
  flex: 1;
  border: 1px solid lightblue;
  margin-left: 10px;
  position: relative;
}

.component {
  position: absolute;
  height: fit-content;
  width: fit-content;
  text-align: center;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.mark-line {
  height: 100%;
}
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}
.xline {
  width: 100%;
  height: 1px;
}
.yline {
  width: 1px;
  height: 100%;
}
</style>
```

:::

## 属性设置

点击组件显示对应的属性设置，修改属性组件样式应用修改。

思路：

1. 点击组件把组件的样式对象绑定到属性设置上
2. 利用双向绑定在修改属性的时候修改对应样式

::: demo

```vue
<template>
  <div class="prop-wrapper">
    <!-- 画板 -->
    <div class="prop-content" ref="content" @click="currentComponent = null">
      <div
        v-for="(item, index) in componentData"
        :key="index"
        class="list"
        :data-index="index"
        :style="Object.assign(item.style)"
        @click="handleClick"
      >
        <!-- 自定义组件 -->
      </div>
    </div>
    <div class="prop-div">
      属性设置
      <div
        v-show="currentComponent"
        v-for="(key, index) in Object.keys(
          currentComponent ? currentComponent.style : {}
        )"
        :key="index"
      >
        <label> {{ key }}：</label>
        <!-- 这里使用 v-model 实现双向绑定 -->
        <input v-model="currentComponent.style[key]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentData: [
        {
          style: {
            top: "20px",
            left: "20px",
            background: "lightblue",
            height: "100px",
            width: "100px"
          }
        },
        {
          style: {
            top: "20px",
            left: "110px",
            background: "lightgrey",
            height: "100px",
            width: "100px"
          }
        }
      ],
      currentComponent: null
    };
  },
  methods: {
    handleClick(e) {
      e.stopPropagation();
      console.log(e.target);
      this.currentComponent = this.componentData[e.target.dataset.index];
    }
  }
};
</script>

<style>
.prop-wrapper {
  border: 1px solid lightblue;
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.prop-div {
  margin: auto;
  width: 300px;
  height: 200px;
  border: 1px solid lightblue;
}
.prop-div div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
}

.prop-div div label {
  width: 120px;
}
.prop-content {
  height: 200px;
  border: 1px solid lightblue;
  margin: 0 20px;
  flex: 1;
  position: relative;
}

.prop-content .list {
  position: absolute;
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
</style>
```

:::

## 预览 保存

预览原理和编辑一样，只是不能编辑，加上一个状态控制是否可以编辑即可

保存就是把画布上的 `componentData` 存储即可，保存有两种选择：

- 服务器
- 客户端 `localStorage`

## 绑定事件 动画

设置里面选中然后给组件添加对应的对象，事件和动画都存储到对象数组里，预览的时候绑定

## 数据请求

默认自定义数据可以添加在 `componentData` 里面的一个属性

远程数据可以配置一个 `url` 属性利用 `websocket` 根据组件 `id` 订阅更新
