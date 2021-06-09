# webpack 打包优化

## 分析工具

### 体积分析

#### 官方工具

可以通过官方提供的 `stat.json` 文件帮助我们分析打包结果，`stat.json` 文件可以通过下面语句快速生成：

```shell
webpack --profile --json > stats.json
```

上传到 [分析工具](http://webpack.github.io/analyse/)，得到下面的分析结果：

<img :src="$withBase('/eng_wpbuild_1.png')" alt="分析结果">

只适用于直接使用 `webpack.config` 的项目，使用脚手架的项目不能得到正确结果（`create-react-app`）

#### 第三方工具

`webpack-bundle-analyzer` 也是基于 `stat.json` 文件进行分析，可以可视化展示出来

使用方式：

- 插件：加入到配置文件中

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

- 工具：全局安装，按照上面方法先生成 `stat.json`，然后运行下面命令：

```shell
webpack-bundle-analyzer bundle/output/path/stats.json
```

`create-react-app` 可以使用 `custom-cra` 里面的 `addBundleVisualizer` 来配置，需要开发依赖安装 `webpack-bundle-analyzer`

**build 命令得到结果来分析**

### 速度分析

`speed-measure-webpack-plugin`

## 策略

- 使用新版本
- 体积优化
  - js css 压缩
  - 刪除无用的 css
    - `PurgeCSS mini-css-extract-plugin`
  - 图片压缩
    - 手动压缩图片 [tiny png](https://tinypng.com/)
    - 自动 `image-webpack-loader`
  - 拆分代码
- 速度优化
  - 分离开发、生成环境配置
  - 减少查找过程：对 `resolve` 参数进行合理配置，使用 `resolve` 字段告诉 `webpack` 怎么去搜索文件
  - 优化 `resolve.modules`
  - 使用 `resolve.alias` 减少查找过程
  - 多线程 `thread-loader`
  - 预先编译资源模块 `webpack.DllPlugin`
  - 缓存 `Cache` 相关
  - 合理使用 `sourceMap`
