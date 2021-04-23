# canvas 绘制表格

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>02Canvas案例-绘制表格</title>
  </head>
  <body>
    <div id="container">
      <canvas id="cavsElem"> 你的浏览器不支持canvas，请升级浏览器 </canvas>
    </div>
    <script>
      (function() {
        var canvas = document.querySelector("#cavsElem");
        var ctx = canvas.getContext("2d");
        canvas.width = 1200;
        canvas.height = 600;
        canvas.style.border = "1px solid green";
        var rectH = 20;
        var rectW = 50;
        ctx.lineWidth = 0.5;
        //绘制表格
        // 第一步： 绘制横线
        for (var i = 0; i < canvas.width; i++) {
          ctx.moveTo(rectW * i, 0);
          //如果不设置moveTo，当前画笔没有位置
          ctx.lineTo(rectW * i, canvas.height);
        }
        //第二步：绘制竖线：如果绘制的格子的宽高相等，可以将for循环放到一个里面；
        for (var i = 0; i < canvas.height; i++) {
          ctx.moveTo(0, rectH * i);
          ctx.lineTo(canvas.width, rectH * i);
        }

        // 根据坐标绘制表格内容
        for (var i = 0; i < canvas.width; i++) {
          for (var j = 0; j < canvas.height; j++) {
            ctx.fillText(
              i + "," + j,
              ~~(rectW * (i + 0.5)),
              ~~(rectH * (j + 0.5))
            );
          }
        }
        ctx.stroke();

        function pick(e) {
          var rect = canvas.getBoundingClientRect(),
            pos = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };

          // 把每个块的坐标保存，判断鼠标移动到哪个块上，就根据坐标修改样式
          ctx.fillRect(pos.x, pos.y, rectW, rectH);
        }
        canvas.addEventListener("mousemove", pick);
      })();
    </script>
  </body>
</html>
```
