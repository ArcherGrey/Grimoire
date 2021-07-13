# 工程化

## npm

- 包 更新发布
  - version 使用 npm version 修改
  - 如果需要引入，但是不想打包的库 webpack 配置 externals

版本更新：

- npm version | yarn version
  - patch 0.0.1-0.0.2
  - minor 0.0.1-0.1.0
  - major 0.0.1-1.0.0

推送本地所有 tag 到远程

- git push origin --tags

发布包

- npm publish | yarn publish

强制刪除快速

- rimraf

问题
- mac 全局安装显示权限不足
  - 命令前面加 `sudo` 

## 工具列表

- 包管理工具

  - npm
    - npx 解决全局安装依赖和版本问题
  - yarn
  - nrm 切换 `npm` 源

- CI/CD

  - semantic-release 全自动版本管理和包发布

- 网络

  - Axios 基于 promise 的 HTTP 库

* 其他
  - html2canvas 截图
  - anywhere 当前目录变成一个静态文件服务器的根目录
  - rimraf 包的形式包装 `rm -rf` 命令

## 小问题

- 图片加载失败会显示裂图，这里可以优化

  - 设置 `onerror` 请求失败替换 `src` 为错误提示图片路径 `onerror="this.src='default.jpg'"`
  - 注意可能导致无限循环 `onerror="this.src='default.jpg'; this.onerror=null"`

- webpack
  - devserve
    - proxy 修改不生效
      - 可能是缓存导致 请求显示`from disk cache`
  - 相同文件多次引用重复打包
    - [路由懒加载](/engineering/router_lazy.html) 造成每个页面单独打包
  - image-webpack-loader
    - `disable: process.env.NODE_ENV == 'development' ? true : false` 配置需要按照环境变化而不是网上默认配置 `true`
    - 开发环境 base64 图片不显示
    - `Cannot find module 'gifsicle'`
      - 暂时没解决
      - 刪除 `node_module` 重新安装 `npm rebuild`
      - `cnpm` 重新安装
