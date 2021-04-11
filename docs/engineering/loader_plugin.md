# 实现 `webpack loader&plugin`

## `loader`

参数是匹配文件的源码，返回结果是处理后的源码

将 `var` 关键词替换为 `const`：

```js
module.exports = function(source) {
  return source.replace(/var/g, "const");
};
```

测试：

```js
function test() {
  var a = 1;
  var b = 2;
  var c = 3;
  console.log(a, b, c);
}

test();
```

`webpack` 配置：

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve("./src/loader1.js"),
          },
        ],
      },
    ],
  },
};
```

## `Plugin`

- 一个 JavaScript 命名函数。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。

```js
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin("webpacksEventHook", function(
    compilation /* 处理 webpack 内部实例的特定数据。*/,
    callback
  ) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```

作用是将经过 loader 处理后的打包文件 bundle.js 引入到 index.html 中：

```js
function Plugin(options) {}

Plugin.prototype.apply = function(compiler) {
  // 所有文件资源经过不同的 loader 处理后触发这个事件
  compiler.plugin("emit", function(compilation, callback) {
    // 获取打包后的 js 文件名
    const filename = compiler.options.output.filename;
    // 生成一个 index.html 并引入打包后的 js 文件
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="${filename}"></script>
</head>
<body>
    
</body>
</html>`;
    // 所有处理后的资源都放在 compilation.assets 中
    // 添加一个 index.html 文件
    compilation.assets["index.html"] = {
      source: function() {
        return html;
      },
      size: function() {
        return html.length;
      },
    };

    // 功能完成后调用 webpack 提供的回调
    callback();
  });
};

module.exports = Plugin;
```
