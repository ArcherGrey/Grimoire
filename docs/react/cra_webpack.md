# 修改 `create react app` 的 `webpack` 配置

## `eject`

使用 `CRA` 创建完项目以后，项目在 `package.json` 里面提供了这样一个命令：

```json
{
  "scripts": {
    "eject": "react-scripts eject"
  }
}
```

执行完这个命令后会将封装在 `CRA` 中的配置全部反编译到当前项目，这样用户就可以完全取得 `webpack` 文件的控制权，想怎么修改就怎么修改了:

```shell
# eject 后项目根目录下会出现 config 文件夹，里面就包含了 webpack 配置
config
├── env.js
├── jest
│   ├── cssTransform.js
│   └── fileTransform.js
├── paths.js
├── polyfills.js
├── webpack.config.dev.js // 开发环境配置
├── webpack.config.prod.js // 生产环境配置
└── webpackDevServer.config.js

```

但如果使用了 `eject` 命令，就再也享受不到 `CRA` 升级带来的好处了，因为 `react-scripts` 已经是以文件的形式存在于你的项目，而不是以包的形式，所以无法对其升级。

## 替换 `react-scripts` 包

`react-scripts` 是 `CRA` 的一个核心包，一些脚本和工具的默认配置都集成在里面，使用 `CRA` 创建项目默认就是使用这个包，但是 `CRA` 还提供了另外一种方式来创建 `CRA` 项目，即使用自定义 `scripts` 包的方式:

```shell
# 默认方式
$ create-react-app foo
# 自定义 scripts 包方式
$ create-react-app foo --scripts-version 自定义包

```

自定义包可以是下面几种形式：

- `react-scripts` 包的版本号，比如 `0.8.2`，这种形式可以用来安装低版本的 `react-scripts` 包。
- 一个已经发布到 `npm` 仓库上的包的名字，比如 `your-scripts`，里面包含了修改过的 `webpack` 配置。
- 一个 `tgz` 格式的压缩文件，比如 `/your/local/scripts.tgz`，通常是未发布到 `npm` 仓库的自定义 `scripts` 包，可以用 `npm pack` 命令生成。

这种方式相对于之前的 `eject` 是一种更灵活地修改 `webpack` 配置的方式，而且可以做到和 `CRA` 一样，通过升级 `scrips` 包来升级项目特性。
自定义 `scripts` 包的结构可以参照 `react-scripts` 包的结构，只要修改对应的 `webpack` 配置文件，并安装上所需的 `webpack loader` 或 `plugin` 包就可以了。

## `customize-cra`

[地址](https://github.com/arackaf/customize-cra)

根据文档扩展配置：

```js
const { override } = require("customize-cra");
module.exports = {};
```

修改 `package.json`:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  }

```

## `CRACO`

[地址](https://github.com/gsoft-inc/craco)

无需 `eject`，通过 `craco.config` 就能自定义配置

1. 安装：

```shell
$ yarn add @craco/craco

# OR

$ npm install @craco/craco --save
```

2. 根目录下创建 `craco.config.js`
3. 修改 `package.json` 里面的 `script`:

```json
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

## 比较

- `eject` 不可逆，而且无法随着官方升级
- `react-script` 需自己发布维护自定义包，适合长期维护的项目
- `custom-cra` 2020 5 月就没更新了，配置较复杂，许多 `plugin loader` 无法配置
- `craco` 还在维护 感觉功能也比 `custom-cra` 强，`antd` 推荐使用
