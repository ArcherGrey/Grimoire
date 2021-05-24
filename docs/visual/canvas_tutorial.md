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

### `Path2D` 对象

> 为了简化代码和提高性能，可以使用 `Path2D` 用来缓存或记录绘画命令

常用 `API`：

- `Path2D(path)`：返回一个 `Path2D` 对象，用一个路径或者一个 `svg path` 的字符串来初始化
- `Path2D.addPath(path,transform)`：添加一条路径或者变换矩阵

示例：

::: demo

```vue
<template>
  <canvas id="canvas-t-2-path2d"> </canvas>
</template>

<script>
export default {
  methods: {
    drawPath2D() {
      let canvas = document.getElementById("canvas-t-2-path2d");
      if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        // 缓存正方形
        let rectIns = new Path2D();
        rectIns.rect(10, 10, 50, 50);
        ctx.strokeStyle = "green";
        ctx.stroke(rectIns);

        // 缓存圆形
        let circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill(circle);

        // 缓存 svg path 字符串
        let p = new Path2D("M5 5 h 80 v 80 h -80 Z");
        ctx.strokeStyle = "blue";
        ctx.stroke(p);
      }
    }
  },
  mounted() {
    this.drawPath2D();
  }
};
</script>
```

:::

## 设置样式

> 通过设置 **绘制上下文** 对应属性来修改样式，绘制图形的样式由最近一次设置决定

### 颜色

通过两个属性来设置：

- `fillStyle = color`：填充颜色
- `strokeStyle = color`：描边颜色

`color` 可以是：

- `orange`
- `#fff`
- `rgb(255,255,0)`
- `rgba(255,255,0,0.1)`

`fillStyle` 示例：
::: demo

```vue
<template>
  <canvas id="canvas-t-3-fill"></canvas>
</template>

<script>
export default {
  methods: {
    drawFillStyle() {
      var ctx = document.getElementById("canvas-t-3-fill").getContext("2d");
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          ctx.fillStyle =
            "rgb(" +
            Math.floor(255 - 42.5 * i) +
            "," +
            Math.floor(255 - 42.5 * j) +
            ",0)";
          ctx.fillRect(j * 25, i * 25, 25, 25);
        }
      }
    }
  },
  mounted() {
    this.drawFillStyle();
  }
};
</script>
```

:::

`strokeStyle` 示例：

::: demo

```vue
<template>
  <canvas id="canvas-t-3-stroke"></canvas>
</template>

<script>
export default {
  methods: {
    drawStrokeStyle() {
      var ctx = document.getElementById("canvas-t-3-stroke").getContext("2d");
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          ctx.strokeStyle =
            "rgb(0," +
            Math.floor(255 - 42.5 * i) +
            "," +
            Math.floor(255 - 42.5 * j) +
            ")";
          ctx.beginPath();
          ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
          ctx.stroke();
        }
      }
    }
  },
  mounted() {
    this.drawStrokeStyle();
  }
};
</script>
```

:::

### 透明度

> `globalAlpha = transparencyValue` 设置透明度

这样设置更灵活，可以单独设置轮廓和填充透明度：

```js
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

例子：

::: demo

```vue
<template>
  <canvas id="canvas-t-3-globalAlpha"></canvas>
</template>

<script>
export default {
  methods: {
    drawGlobalAlpha() {
      var ctx = document
        .getElementById("canvas-t-3-globalAlpha")
        .getContext("2d");
      // 画背景
      ctx.fillStyle = "#FD0";
      ctx.fillRect(0, 0, 75, 75);
      ctx.fillStyle = "#6C0";
      ctx.fillRect(75, 0, 75, 75);
      ctx.fillStyle = "#09F";
      ctx.fillRect(0, 75, 75, 75);
      ctx.fillStyle = "#F30";
      ctx.fillRect(75, 75, 75, 75);
      ctx.fillStyle = "#FFF";

      // 设置透明度值
      ctx.globalAlpha = 0.2;

      // 画半透明圆
      for (var i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  },
  mounted() {
    this.drawGlobalAlpha();
  }
};
</script>
```

:::

### 线

线的样式属性：

- `lineWidth`：线条宽度
- `lineCap`：线条末端样式
- `lineJoin`：线条之间结合处样式
- `miterLimit`：限制当两条线相交时交接处最大长度

虚线：

- `getLineDash()`：获取当前虚线样式
- `setLineDash()`：设置当前虚线样式
- `lineDashOffset`：设置虚线样式的起始偏移

像素边缘：

::: demo

```vue
<template>
  <canvas id="canvas-t-3-line"></canvas>
</template>

<script>
export default {
  methods: {
    drawLine() {
      var ctx = document.getElementById("canvas-t-3-line").getContext("2d");
      ctx.lineWidth = 1;
      ctx.beginPath();
      // 边界不在像素边缘上
      ctx.moveTo(5, 5);
      ctx.lineTo(5, 100);

      // 边界在像素边缘上
      ctx.moveTo(25.5, 5);
      ctx.lineTo(25.5, 100);
      ctx.stroke();
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>
```

:::

<img :src="$withBase('/canvas_t_2.png')" alt="线">

如果线条的边缘不在像素边界上，如左图就会导致渲染不精确，在像素边缘上就如右图，上面例子第一个线条边缘不在边界上，第二个在，明显第一个绘制不精确

### 渐变

- `createLinearGradient(x1, y1, x2, y2)` 线性渐变
- `createRadialGradient(x1, y1, r1, x2, y2, r2)` 径向渐变
- `gradient.addColorStop(position, color)` 添加色标

`createLinearGradient` 例子:

::: demo

```vue
<template>
  <canvas id="canvas-t-3-linerGradients"></canvas>
</template>

<script>
export default {
  methods: {
    drawLinerGradients() {
      var ctx = document
        .getElementById("canvas-t-3-linerGradients")
        .getContext("2d");
      // Create gradients
      var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
      lingrad.addColorStop(0, "#00ABEB");
      lingrad.addColorStop(0.5, "#fff");
      lingrad.addColorStop(0.5, "#26C000");
      lingrad.addColorStop(1, "#fff");

      var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
      lingrad2.addColorStop(0.5, "#000");
      lingrad2.addColorStop(1, "rgba(0,0,0,0)");

      // assign gradients to fill and stroke styles
      ctx.fillStyle = lingrad;
      ctx.strokeStyle = lingrad2;

      // draw shapes
      ctx.fillRect(10, 10, 130, 130);
      ctx.strokeRect(50, 50, 50, 50);
    }
  },
  mounted() {
    this.drawLinerGradients();
  }
};
</script>
```

:::

`createRadialGradient` 例子:

::: demo

```vue
<template>
  <canvas id="canvas-t-3-radialGradient"></canvas>
</template>

<script>
export default {
  methods: {
    drawRadialGradient() {
      var ctx = document
        .getElementById("canvas-t-3-radialGradient")
        .getContext("2d");
      // Create gradients
      var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
      radgrad.addColorStop(0, "#A7D30C");
      radgrad.addColorStop(0.9, "#019F62");
      radgrad.addColorStop(1, "rgba(1,159,98,0)");

      var radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
      radgrad2.addColorStop(0, "#FF5F98");
      radgrad2.addColorStop(0.75, "#FF0188");
      radgrad2.addColorStop(1, "rgba(255,1,136,0)");

      var radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
      radgrad3.addColorStop(0, "#00C9FF");
      radgrad3.addColorStop(0.8, "#00B5E2");
      radgrad3.addColorStop(1, "rgba(0,201,255,0)");

      var radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
      radgrad4.addColorStop(0, "#F4F201");
      radgrad4.addColorStop(0.8, "#E4C700");
      radgrad4.addColorStop(1, "rgba(228,199,0,0)");

      // 画图形
      ctx.fillStyle = radgrad4;
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = radgrad3;
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = radgrad2;
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = radgrad;
      ctx.fillRect(0, 0, 150, 150);
    }
  },
  mounted() {
    this.drawRadialGradient();
  }
};
</script>
```

:::

### 图案

`createPattern(image, type)`:

- `Image` 可以是一个 `Image` 对象的引用，或者另一个 `canvas` 对象
- `Type`：`repeat，repeat-x，repeat-y 和 no-repeat`

例：

::: demo

```vue
<template>
  <canvas id="canvas-t-3-Patterns"></canvas>
</template>

<script>
export default {
  methods: {
    drawPatterns() {
      var ctx = document.getElementById("canvas-t-3-Patterns").getContext("2d");
      // 创建新 image 对象，用作图案
      var img = new Image();
      img.src = "/Grimoire/css_amazing_1.png";
      img.onload = function() {
        // 创建图案
        var ptrn = ctx.createPattern(img, "repeat");
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 150, 150);
      };
    }
  },
  mounted() {
    this.drawPatterns();
  }
};
</script>
```

:::

### 阴影

- `shadowOffsetX = float` x 轴延伸距离
- `shadowOffsetY = float` y 轴延伸距离
- `shadowBlur = float` 阴影模糊程度
- `shadowColor = color` 阴影颜色

文字阴影：

::: demo

```vue
<template>
  <canvas id="canvas-t-3-Shadows"></canvas>
</template>

<script>
export default {
  methods: {
    drawShadows() {
      var ctx = document.getElementById("canvas-t-3-Shadows").getContext("2d");
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

      ctx.font = "20px Times New Roman";
      ctx.fillStyle = "Black";
      ctx.fillText("Sample String", 5, 30);
      ctx.strokeText("Sample String", 150, 30);
    }
  },
  mounted() {
    this.drawShadows();
  }
};
</script>
```

:::

## 绘制文本

## 参考

- [mdn canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
