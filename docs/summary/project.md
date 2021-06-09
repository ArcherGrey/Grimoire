# 项目总结

## 医疗信息管理系统

项目概述：基于 ASP.NET 和 JQuery easy-ui 开发的放射科病人信息管理系统，主要用于和放射设备配套信息处理病例创建、病例编辑、拍片查看等流程

- 首屏加载时间长达 8s，病人信息列表交互卡顿，影响用户体验
  - 性能优化提升 60%，交互操作流畅度明显提升
- 编辑病例状态同步，网络连接断开问题
  - websocket 结合发布订阅模式实现病例状态同步和断线重连

思路：

场景：性能优化

结合 chrome perfomance 查看操作执行耗时分布

- JQuery
  - 尽可能使用 id 选择器
  - 在需要多次使用相同选择器的地方缓存，避免相同的对象重复查找
  - 循环调用 append 操作 dom 修改为用临时变量保存修改然后一次操作 dom
  - 直接用 JQuery 选择器多次修改样式 -> 将需要修改的样式合成一个 class 添加 class 即可
- 资源加载 页面渲染
  - 无需同步执行的请求 改为 异步执行
  - 添加资源预加载
    - 关键的脚本、字体、主要图片 preload
    - 可能会加载的资源 prefetch
  - 不太重要的脚本用异步加载 defer
  - 多个图片合成雪碧图加载减少请求次数
- 执行操作优化
  - 列表用事件委托绑定
  - 搜索添加防抖避免短时间多次请求

场景： websocket 实时通讯

- 发布订阅

  - 修改病例状态 -> 发送状态修改事件 -> 发布所有在线订阅事件
  - 断线 心跳 重连
    - 断网 服务器无法感知
    - 每隔固定时间向服务器发送心跳包 定时器
    - 重连 定时器发送重新连接请求
    - 心跳也是为了保持连接 一定时间没有消息会自动断开

1. 创建实例 new websocket
2. 初始化 实例上封装事件监听

- onclose onerror 重连
- onmessage 接收消息 发送心跳
- onopen 发送心跳

## 可视化系统

- [可视化拖拽组件](/engineering/vdrag.html)
- [前端文件预览](/engineering/preview.html)
- [前端下载](/engineering/download.html)

- vue
  - vuex 状态管理
  - vue-router 路由管理
- axios 封装 http
- echarts 封装图表组件
- code mirror 编辑器
- element ui
- eslint 配置语法规则
- githook 配置提交规范

- 仪表盘 可视化产品 管理制作分享
- 大屏模板 产品模板
- 图表库
  - 内置图表
  - 自定义图表 类似 Codepen
    封装了一个加载函数，动态添加 `script` 的方式引入需要的插件，在回调函数里面执行操作
- 素材管理 色标选项配置数据
- 数据源 数据源配置
  - python 返回结果二次处理
- 用户管理

https://mp.weixin.qq.com/s/af-F2goqnfMEo_yT_yFUMw

## 旅游

- `customize-cra` 修改 `create react app` 配置

- webpack
  - 工具 `webpack-bundle-analyzer`
  - 体积优化 1.09 M gzip
    - echarts 300kb -> 158kb
      - echarts 5.0 以后 示例添加 option 完整代码自动显示按需引用
    - geojson 216kb
    - mock.js 49kb -> 0 只有开发时需要

## 难点

- antd 上传组件 上传图片
  - 需求：
    - 拖拽排序
      - react-dnd
    - 上传图片方式
      - 表单
        - 需要 form 设置 encode-type form-data
        - 会刷新页面，无法处理后台返回
      - formData rc-upload 对 filelist 循环使用
        - 额外参数和文件数据通过 formData.append 添加
          - 如果 axios 封装默认 contenttype 不是 multipart/form-data 需要修改
        - xmlhttprequest
    - 上传需要附参数
      - 设置 data
    - 需要选中图片，点击按钮设置封面背景
      - 点击图片设置选中 使用 border 来标识选中
      - 使用 before after + 绝对定位 内外圈来标识封面背景
      - 接口需要图片 id
        - 组件默认是非受控组件，文件列表状态内部管理
        - 需要用后台返回的文件列表来设置组件状态，受控组件
    - 图片列表变化 执行上传
      - onchange 执行操作
