# `Canvas` 教程

## 基本用法

- `canvas` 看起来和 `img` 很像，不同在于
  - 没有 `src alt` 属性
  - 需要结束标签 `</canvas>` 不可省略
- 只有两个属性 `width height`，没有设置的时候默认值为 `width:300px height:150px`
- `id` 不是 `canvas` 特有，每个标签都有

### 渲染上下文

`canvas` 创造了一个大小固定的画布，通过其渲染上下文可以用来绘制和处理需要展示的内容（主要是 `2D`，`WebGl` 处理 `3D`）

获取渲染上下文：

```js
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");
```

### 检查支持性

通过 `getContext` 检查是否支持 `canvas` ，不支持则显示替代内容：

```js
var canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

### 例子

下面绘制两个正方形：

::: demo

```vue
<template>
  <canvas id="canvas-t-1" width="150" height="150"></canvas>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    draw() {
      let canvas = document.getElementById("canvas-t-1");
      if (canvas.getContext) {
        // 获取渲染上下文
        var ctx = canvas.getContext("2d");

        // 设置正方形1
        ctx.fillStyle = "rgb(200,0,0)"; // 颜色
        ctx.fillRect(10, 10, 50, 50); // 坐标 x,y 长宽

        // 设置正方形2
        ctx.fillStyle = "rgb(0,0,200,0.5)"; // 颜色
        ctx.fillRect(30, 30, 50, 50); // 坐标 x,y 长宽
      }
    }
  },
  mounted() {
    this.draw();
  }
};
</script>
```

:::

## 绘制基本图形

::: tip 栅格

`canvas` 元素默认被网格所覆盖。通常来说网格中的一个单元相当于`canvas` 元素中的一像素。栅格的起点为左上角（坐标为（`0,0`））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（`X 轴`）x 像素，距离上边（`Y 轴`）y 像素（坐标为（`x,y`））

<img :src="$withBase('/canvas_t_1.png')" alt="栅格">

:::

### 绘制矩形

相关 `API`：

- 填充矩形 `fillRect(x,y,width,height)`
- 矩形边框 `strokeRect(x,y,width,height)`
- 清除矩形 `clearRect(x,y,width,height)`

::: demo

```vue
<template>
  <div>
    <canvas id="canvas-t-2-rect" width="150" height="150"> </canvas>
    <button @click="drawArea">绘制填充矩形</button>
    <button @click="drawStroke">绘制矩形边框</button>
    <button @click="clearRect">清除矩形</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawArea() {
      let canvas = document.getElementById("canvas-t-2-rect");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,0,200,0.5)"; // 颜色
        ctx.fillRect(30, 30, 50, 50); // 坐标 x,y 长宽
      }
    },
    drawStroke() {
      let canvas = document.getElementById("canvas-t-2-rect");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "green"; // 颜色
        ctx.strokeRect(20, 20, 70, 70); // 坐标 x,y 长宽
      }
    },
    clearRect() {
      let canvas = document.getElementById("canvas-t-2-rect");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(19, 19, 72, 72); // 坐标 x,y 长宽
      }
    }
  },
  mounted() {
    this.drawArea();
    this.drawStroke();
  }
};
</script>
```

:::

### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤：

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形

相关 `API`:

- 新建路径 `beginPath`
- 闭合路径 `closePath`
- 绘制轮廓 `stroke`
- 填充 `fill`
- 移动笔触 `moveTo(x,y)`
- 绘制直线 `lineTo(x,y)`
- 圆弧
  - `arc(x, y, radius, startAngle, endAngle, anticlockwise)`：`x,y` 为圆心的以 `radius` 为半径的圆弧 从 `startAngle`弧度到 `endAngle` 按照 `anticlockwise` 给定（默认顺时针）方向生成
  - `arcTo(x1, y1, x2, y2, radius)`：根据给定控制点和半径画圆弧，再以直线连接两个控制点
- 贝塞尔曲线

  - `quadraticCurveTo(cp1x, cp1y, x, y)`：绘制二次贝塞尔曲线，`cp1x,cp1y` 为一个控制点，`x,y` 为结束点
  - `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：绘制三次贝塞尔曲线，`cp1x,cp1y` 为控制点一，`cp2x,cp2y` 为控制点二，`x,y` 为结束点

::: warning 注

- 新建路径之后 `beginPath` 调用之后，第一条路径构造命令通常是 `moveTo`
- 调用 `fill` 所有没有闭合的形状都会闭合，就不需要调用 `closePath`，但是调用 `stroke` 就不会自动闭合
- `弧度=(Math.PI/180)*角度`

:::

绘制三角形：

::: demo

```vue
<template>
  <div>
    <canvas id="canvas-t-2-triangle" width="150" height="150"> </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawTFill() {
      let canvas = document.getElementById("canvas-t-2-triangle");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        // 填充三角形
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();
      }
    },
    drawTStroke() {
      let canvas = document.getElementById("canvas-t-2-triangle");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        // 描边三角形
        ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        ctx.closePath();
        ctx.stroke();
      }
    }
  },
  mounted() {
    this.drawTFill();
    this.drawTStroke();
  }
};
</script>
```

:::

绘制笑脸（圆弧）：

::: demo

```vue
<template>
  <div>
    <canvas id="canvas-t-2-arc" width="150" height="150"> </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawArc() {
      let canvas = document.getElementById("canvas-t-2-arc");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 脸
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
        ctx.stroke();
      }
    }
  },
  mounted() {
    this.drawArc();
  }
};
</script>
```

:::

绘制对话气泡（二次贝塞尔）：

::: demo

```vue
<template>
  <div>
    <canvas id="canvas-t-2-quadraticCurve" width="150" height="150"> </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawQC() {
      let canvas = document.getElementById("canvas-t-2-quadraticCurve");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        // 二次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
      }
    }
  },
  mounted() {
    this.drawQC();
  }
};
</script>
```

:::

绘制心形（三次贝塞尔）：

::: demo

```vue
<template>
  <div>
    <canvas id="canvas-t-2-bezierCurve" width="150" height="150"> </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawBC() {
      let canvas = document.getElementById("canvas-t-2-bezierCurve");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        //三次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
      }
    }
  },
  mounted() {
    this.drawBC();
  }
};
</script>
```

:::

## 参考

- [mdn canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
