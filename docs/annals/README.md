---
sidebar: auto
---

# 编年史

[[toc]]

## 医疗联邦

2017.7 - 2019.11

RIS

- 前端功能实现 版本迭代
  - JQuery + easyUI
  - kind editor 仿 word 在线编辑库
  - websocket 实时更新状态
  - 加载缓慢 无模块化 逻辑混乱 迭代时间长
- UI 更新
  - bootstrap
- 后端业务逻辑 （CURD）
  - 操作服务器 接口
  - MVC C#
  - 服务器渲染 IIS
- 环境配置批处理脚本
  - 编写网络配置批处理脚本
- bug 修复
  - 现场问题 缺少环境分析问题解决
  - 代码逻辑问题
  - tfs
- 编写流程测试用例
  - selenium

## 云图

### 物流气象预警系统

面向物流公司，根据气象信息对物流路线进行预警提示

2019 11 - 2020 6

- 小程序 uniapp 管理员和用户登陆

  - 车辆管理
    - 车辆键盘 uni 市场组件
  - 人员管理
  - 用户登陆、注册
    - 二维码邀请 分享
    - 登陆引导
    - 手机号 地理位置获取
  - 用户设置
  - 添加分享功能

- PC 端 vue + vuex + antd-vue 管理员使用
  - 车辆管理
  - 人员管理
  - 用户登陆
    - 扫码登录 扫码关注公众号 扫码打开小程序
    - pc ip 地址定位

### 大数据可视化系统

通过配置数据源和设置样式自动生成常用图表组建，拖拽布局快速搭建数据可视化页面

2020 2 - 2020 6

- vue
- vuex
- axios
- typescript
- vue router
- echarts
- echarts-gl
- echarts-leaflet
- echarts-wordcloud
- element-ui
- html2canvas
- moment

* echarst 图表包装组件
* 散点图 柱状图 折线图常用图表配置
* 3D 柱状图 饼图 词云图 矩形树图
* 每日天气 动态列表 自定义图表
* 多图联动

- 展示图表 编辑图表区域 dsContent

  - 左侧创建图表 chartCreate
    - 拖拽生成图表 drop
      - 触发 createChart
        - 将新创建的图表的 id 和样式（长宽位置）信息作为一个元素加入到组件数组
        - 组件数组更新触发 vue-layout 组件的 layout-item 创建新图表框架
        - 请求数据然后 触发 setChartData 画出图表

- 编辑图表
  - 数据设置
    - 静态数据： 自定义数据 JSON 编辑器
    - 动态数据
      - 数据库查询
      - REST 接口
  - 图表设置
    - 基本设置
      - 公共部分： 图表名称、简介、缓存时间、保存、数据类型（选择动态查询还是静态数据）
      - 独有部分： 数据选择
    - 样式设置
      - 公共部分：标题、背景、边框
      - 独有部分：各个图表的特殊设置
    - 图表联动：将动态数据中创建的变量和其他图表的事件关联达到图表之间数据联动（自定义数据不能联动）

**自定义图表**

1. 在顶部菜单中点击自定义图表
2. 点击右侧的新建按钮
3. 左侧是代码编辑区域，右侧是预览区域
4. 代码编辑区域

- `html` 默认是 `tmpl` 模板
- `css` 基本的 `css`
- `JavaScript` 用来加载动态数据或者加载外部或者对自定义数据进行预处理 `js` 和 `css`
- `json` 自定义数据

5.  加载外部 `js` 和 `css`
    可以使用 `loadSelfPlugin(pluginArr, callback)` 加载,该方法支持 2 个参数：

- `pluginArr` 是一个由插件地址组成的数组。例如：['http:cdn.url.js','http:cdn.url.css']
- `callback` 是自定义的一个回调方法。该函数会在 `pluginArr` 数组中的 `js` 插件都加载完毕后执行。
  例子:

  ```js
  loadSelfPlugin(["http:cdn.jquery.js"], function() {
    // 此时 jquery 已经加载完成，$(".hello") 有效
    $(".hello").innerHTML = "world";
  });
  // 此时正在加载外部以来，$(".hello") 报错
  $(".hello").innerHTML = "world";
  ```

6. 重新渲染 `html` 模版
   可以使用 `reload(json, html)` ,该方法支持传入 2 个参数：

   - `json` 是模版渲染的数据，默认值为 `JSON` 定义的数据；
   - `html` 是渲染模版，默认值为 `HTML` 定义的模版；

**动态数据加载**

1. 加载 `ajax` 插件；
2. 请求数据接口获取数据并转换成定义好的 `schema` 格式；
3. 调用 `reload` 方法，重新渲染页面

```js
loadSelfPlugin(
  ["https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.js"],
  () => {
    axios
      .get("http://119.3.153.232:10070/FalconService/v001/rest/meta/all")
      .then(res => {
        let data = {
          test: JSON.stringify(res.data, null, 2)
        };
        reload(data);
      });
  }
);
```

**具体技术**

- 拖拽生成图表
  - vue-layout vue 布局组件
    - 维护一个子组件数组，每个元素有子组件的样式（长、宽、位置）
  - 拖拽结束触发事件把当前位置作为样式信息，和图表类型包装成子组件对象存到图表组件数组中
  - 组件数组修改触发布局生成新图表区域，然后请求数据完成后触发图表渲染
  - 根据图表类型调用对应组件的渲染方法
- 图表组件复用
  - 动态组件
  - mixins
- 图表类型
  - echart 常规图表
  - echart 扩展 echarts-leaflet 3D
  - 文字列表
    - 定时器 隐藏滑动条
- 图表联动
  - 本质是组件间通信
  - 利用 eventBus
  - 在设置联动的图表上绑定事件
  - 操作其他图表的时候触发绑定事件

### k8s 管理检测系统

2020 6 - 2020 8

- x
  - 静态页面开发
  - 接口对接测试功能
  - 业务熟悉
- y
  - k8s 监控
  - 复杂数据结构 ts

### k8s 集群监控组件

2020 8 - 2020 11

- 监控图表组件
  - 私有 npm 库
  - 组件库发布更新
  - 基于 grafana 样式
  - 封装 echarts 折线图 仪表图
    - 默认配置
    - 主题配置
    - 自定义查询
    - 单位转换
    - 渲染周期配置
    - resize 配置
      ...
  - 工具栏和图表联动
    - 时间范围选择
    - 刷新
  - 卡片图
  - 文档
- 文件预览
  - pdf vue-pdf
  - csv table
  - excel sheetjs canvas-datagrid
    - 数据量大 滑动条卡顿 滑动内存上升

### 气象水文数据

2020 11 - 2021 1

- x
  - 站点、气象、卫星数据查询
  - 气象数据展示
    - 色斑图
    - 网格数据
    - 站点显示
  - 数据保存下载
- y
  - axios 封装
    - 重复请求拦截
    - 拦截异常返回 提示错误
  - leaflet
    - 插值计算 geojson 色斑图
    - 站点 marker 位置
    - 网格 marker 抽稀
  - 组件状态
    - 简单 store 模式
  - 样式适配
    - rem
  - 按钮权限
    - 自定义指令
    - 动态路由
    - 路由守卫
  - 组件样式
    - datapicker 对齐
      - 源码 px 修改 rem 配置
