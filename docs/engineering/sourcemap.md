# sourcemap

::: tip 概念

调试原始源代码会比浏览器下载的转换后的代码更加容易。 `source map` 是从已转换的代码映射到原始源的文件，使浏览器能够重构原始源并在调试器中显示重建的原始源。

:::

## 配置关键字

|    关键字    |                     含义                      |              特点              |                  注                  |
| :----------: | :-------------------------------------------: | :----------------------------: | :----------------------------------: |
| `source-map` |               产生 `.map` 文件                |        最精确 体积最大         |                                      |
|    `eval`    |           使用 `eval` 包裹模块代码            |        会缓存 提高性能         |                                      |
|   `cheap`    | 不包含列信息也不包含 `loader` 的 `sourcemap`  |     只能定位到行 体积缩小      | `babel` 转义过只能定位到转换后的代码 |
|   `module`   |          包含 `loader` 的 `sourcema`          | 可以定位 `loader` 处理前的源码 |                                      |
|   `inline`   | 将 `.map` 作为 `DataURI` 嵌入，不单独生成文件 |           减少文件数           |                                      |

最佳实践：

- 开发环境：`cheap-module-eval-source-map`
  - 快：`eval`
  - 信息尽可能全：`module`
- 生产环境：`hidden-source-map`
  - 平时不暴露 `source-map` 只有错误信息跟踪会有

## 如何映射

源文件：

```js
let a = 1;
let b = 2;
let c = 3;
```

输入内容：

```js
var a = 1,
  b = 2,
  c = 3;
```

`map`:

```json
{
  "version": 3,
  "file": "script-min.js",
  "lineCount": 1,
  "mappings": "AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;",
  "sources": ["script.js"],
  "names": ["a", "b", "c"]
}
```

其中字段含义：

|    字段    |        含义         |
| :--------: | :-----------------: |
| `version`  | `Source map` 的版本 |
|   `file`   |   转换后的文件名    |
| `sources`  |       源文件        |
|  `names`   | 源文件的所有变量名  |
| `mappings` |      位置信息       |

解决问题：

- 输出后位置元素的列号特别大
  - 通过相对位置来解决
- 存储映射信息的数据结构大小
  - `base64-VLQ` 编码

[base64](/engineering/encode.html)

对数字进行 `VLQ` 编码，使用 `base64` 标识编码结果
