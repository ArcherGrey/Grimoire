# 基于 `canvas` 绘制 `chart`

常用的 `echarts` 绘制图表都是基于 `canvas` 或者 `svg`

这里来实现一下基于 `canvas` 的图表绘制

柱状图和饼图：

::: demo

```vue
<template>
  <canvas id="canvas-chart" width="500" height="1000"></canvas>
</template>

<script>
export default {
  methods: {
    drawChart(data) {
      let canvas = document.getElementById("canvas-chart");
      let c = canvas.getContext("2d");

      // 设置背景
      c.fillStyle = "white";
      c.fillRect(0, 0, 500, 500);

      // 设置柱状
      c.fillStyle = "blue";
      for (var i = 0; i < data.length; i++) {
        var dp = data[i];
        // y 轴和 canvas 是相反的所以需要减去高度 dp*5
        c.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
      }

      // 设置坐标轴
      c.fillStyle = "black";
      c.lineWidth = 2.0;
      c.beginPath();
      c.moveTo(30, 10);
      c.lineTo(30, 460);
      c.lineTo(490, 460);
      c.stroke();

      // 设置 y 轴标签
      c.fillStyle = "black";
      for (var i = 0; i < 5; i++) {
        c.fillText((4 - i) * 20 + "", 4, i * 100 + 60);
        c.beginPath();
        c.moveTo(25, i * 100 + 60);
        c.lineTo(30, i * 100 + 60);
        c.stroke();
      }

      // 设置 x 轴标签
      for (var i = 0; i < 5; i++) {
        c.fillText(data[i], 60 + i * 100, 475);
      }

      c.font = "bold 30px serif";
      c.fillText("柱状图", 200, 30);
    },
    drawPie(data, colors) {
      const colorsArr = colors
        ? colors
        : ["orange", "green", "blue", "yellow", "teal"];
      let canvas = document.getElementById("canvas-chart");
      let c = canvas.getContext("2d");

      // 计算总和
      let total = data.reduce((cur, t) => (t += cur));

      // 绘制饼图
      let prev = 0; // 当前扇形开始弧度
      for (let i = 0; i < data.length; i++) {
        // 结束弧度
        let angle = prev + (data[i] / total) * Math.PI * 2;

        // 设置颜色
        c.fillStyle = colorsArr[i % colorsArr.length];
        console.log(c.fillStyle);

        // 绘制扇形
        c.beginPath();
        c.moveTo(250, 750);
        c.arc(250, 750, 150, prev, angle, false);
        c.lineTo(250, 750);
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
        prev = angle;
      }

      c.fillText("饼状图", 200, 550);
    }
  },
  mounted() {
    var data = [16, 68, 20, 30, 54];
    this.drawChart(data);
    this.drawPie(data);
  }
};
</script>
```

:::
