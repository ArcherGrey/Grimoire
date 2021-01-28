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
