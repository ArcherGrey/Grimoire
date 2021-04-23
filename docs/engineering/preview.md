# 前端文件预览

## 图片

使用 `<img>` 标签即可

- 设置 `width height` 为百分比 使得图片能够保持宽高比
- 图片加载失败利用 onerror 事件给图片添加一个新样式 默认一个加载失败图片

## pdf

### 不使用 `JavaScript`

> `<embed>`

`html5` 规范正式标签，现代浏览器大部分都支持，比较老的浏览器可能部分支持，移动端很多都不支持，没有回退内容，可能导致什么都不显示

```html
<embed
  src="../pdf/sample-3pp.pdf#page=2"
  type="application/pdf"
  width="100%"
  height="100%"
/>
```

> `<iframe>`

使用最多最简单的方式，如果不支持 `iframe` 可以提供一个下载链接

```html
<iframe src="../pdf/sample-3pp.pdf#page=2" width="100%" height="100%">
  This browser does not support PDFs. Please download the PDF to view it:
  <a href="../pdf/sample-3pp.pdf">Download PDF</a>
</iframe>
```

> `<object>`

和 `iframe` 一样支持回退显示，基本上都支持 `<object>` 不过不同的浏览器实现方式存在差异

```html
<object
  data="../pdf/sample-3pp.pdf#page=2"
  type="application/pdf"
  width="100%"
  height="100%"
>
  <p>
    <b>Example fallback content</b>: This browser does not support PDFs. Please
    download the PDF to view it:
    <a href="../pdf/sample-3pp.pdf">Download PDF</a>.
  </p>
</object>
```

> 结合 `<object> <iframe>`

使用 `<object>` 包裹一个 `<iframe>` 确保在 `<object>` 不能正常显示的时候使用 `<iframe>`

```html
<object
  data="../pdf/sample-3pp.pdf#page=2"
  type="application/pdf"
  width="100%"
  height="100%"
>
  <iframe
    src="../pdf/sample-3pp.pdf#page=2"
    width="100%"
    height="100%"
    style="border: none;"
  >
    This browser does not support PDFs. Please download the PDF to view it:
    <a href="../pdf/sample-3pp.pdf">Download PDF</a>
  </iframe>
</object>
```

### `js` 库

> `PDFObject`

通过 `<embed>` 标签实现 `PDF` 预览，相当于动态添加 `embed`

不会解析 `pdf` 渲染本质还是依赖浏览器解析

> `pdfjs`

`vue-pdf`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>'Hello, world!' example</title>
  </head>
  <body>
    <h1>'Hello, world!' example</h1>

    <canvas
      id="the-canvas"
      style="border: 1px solid black; direction: ltr;"
    ></canvas>

    <script src="../../node_modules/pdfjs-dist/build/pdf.js"></script>

    <script id="script">
      //
      //  设置 url
      //
      var url = "./helloworld.pdf";

      //
      // pdf.worker.js 地址.
      //
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "../../node_modules/pdfjs-dist/build/pdf.worker.js";

      //
      // 异步下载 PDF
      //
      var loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then(function(pdf) {
        //
        // 获取首页
        //
        pdf.getPage(1).then(function(page) {
          var scale = 1.5;
          var viewport = page.getViewport({ scale: scale });

          //
          // 根据页面宽高设置 canvas 来展示 pdf
          //
          var canvas = document.getElementById("the-canvas");
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          //
          // 把 PDF 页面 加入 canvas context
          //
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
        });
      });
    </script>

    <hr />
    <h2>JavaScript code:</h2>
    <pre id="code"></pre>
    <script>
      document.getElementById("code").textContent = document.getElementById(
        "script"
      ).text;
    </script>
  </body>
</html>
```

## xls csv

- `sheetjs` 解析数据
- `canvas-datagrid` 展示 [绘制表格](/explorer/canvas_table.html)
