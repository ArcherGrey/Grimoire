(window.webpackJsonp=window.webpackJsonp||[]).push([[245],{645:function(v,_,l){"use strict";l.r(_);var i=l(19),e=Object(i.a)({},(function(){var v=this,_=v.$createElement,l=v._self._c||_;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h1",{attrs:{id:"项目总结"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#项目总结"}},[v._v("#")]),v._v(" 项目总结")]),v._v(" "),l("h2",{attrs:{id:"医疗信息管理系统"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#医疗信息管理系统"}},[v._v("#")]),v._v(" 医疗信息管理系统")]),v._v(" "),l("p",[v._v("项目概述：基于 ASP.NET 和 JQuery easy-ui 开发的放射科病人信息管理系统，主要用于和放射设备配套信息处理病例创建、病例编辑、拍片查看等流程")]),v._v(" "),l("ul",[l("li",[v._v("首屏加载时间长达 8s，病人信息列表交互卡顿，影响用户体验\n"),l("ul",[l("li",[v._v("性能优化提升 60%，交互操作流畅度明显提升")])])]),v._v(" "),l("li",[v._v("编辑病例状态同步，网络连接断开问题\n"),l("ul",[l("li",[v._v("websocket 结合发布订阅模式实现病例状态同步和断线重连")])])])]),v._v(" "),l("p",[v._v("思路：")]),v._v(" "),l("p",[v._v("场景：性能优化")]),v._v(" "),l("p",[v._v("结合 chrome perfomance 查看操作执行耗时分布")]),v._v(" "),l("ul",[l("li",[v._v("JQuery\n"),l("ul",[l("li",[v._v("尽可能使用 id 选择器")]),v._v(" "),l("li",[v._v("在需要多次使用相同选择器的地方缓存，避免相同的对象重复查找")]),v._v(" "),l("li",[v._v("循环调用 append 操作 dom 修改为用临时变量保存修改然后一次操作 dom")]),v._v(" "),l("li",[v._v("直接用 JQuery 选择器多次修改样式 -> 将需要修改的样式合成一个 class 添加 class 即可")])])]),v._v(" "),l("li",[v._v("资源加载 页面渲染\n"),l("ul",[l("li",[v._v("无需同步执行的请求 改为 异步执行")]),v._v(" "),l("li",[v._v("添加资源预加载\n"),l("ul",[l("li",[v._v("关键的脚本、字体、主要图片 preload")]),v._v(" "),l("li",[v._v("可能会加载的资源 prefetch")])])]),v._v(" "),l("li",[v._v("不太重要的脚本用异步加载 defer")]),v._v(" "),l("li",[v._v("多个图片合成雪碧图加载减少请求次数")])])]),v._v(" "),l("li",[v._v("执行操作优化\n"),l("ul",[l("li",[v._v("列表用事件委托绑定")]),v._v(" "),l("li",[v._v("搜索添加防抖避免短时间多次请求")])])])]),v._v(" "),l("p",[v._v("场景： websocket 实时通讯")]),v._v(" "),l("ul",[l("li",[l("p",[v._v("发布订阅")]),v._v(" "),l("ul",[l("li",[v._v("修改病例状态 -> 发送状态修改事件 -> 发布所有在线订阅事件")]),v._v(" "),l("li",[v._v("断线 心跳 重连\n"),l("ul",[l("li",[v._v("断网 服务器无法感知")]),v._v(" "),l("li",[v._v("每隔固定时间向服务器发送心跳包 定时器")]),v._v(" "),l("li",[v._v("重连 定时器发送重新连接请求")]),v._v(" "),l("li",[v._v("心跳也是为了保持连接 一定时间没有消息会自动断开")])])])])])]),v._v(" "),l("ol",[l("li",[v._v("创建实例 new websocket")]),v._v(" "),l("li",[v._v("初始化 实例上封装事件监听")])]),v._v(" "),l("ul",[l("li",[v._v("onclose onerror 重连")]),v._v(" "),l("li",[v._v("onmessage 接收消息 发送心跳")]),v._v(" "),l("li",[v._v("onopen 发送心跳")])]),v._v(" "),l("h2",{attrs:{id:"可视化系统"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#可视化系统"}},[v._v("#")]),v._v(" 可视化系统")]),v._v(" "),l("ul",[l("li",[l("p",[l("RouterLink",{attrs:{to:"/engineering/vdrag.html"}},[v._v("可视化拖拽组件")])],1)]),v._v(" "),l("li",[l("p",[l("RouterLink",{attrs:{to:"/engineering/preview.html"}},[v._v("前端文件预览")])],1)]),v._v(" "),l("li",[l("p",[l("RouterLink",{attrs:{to:"/engineering/download.html"}},[v._v("前端下载")])],1)]),v._v(" "),l("li",[l("p",[v._v("vue")]),v._v(" "),l("ul",[l("li",[v._v("vuex 状态管理")]),v._v(" "),l("li",[v._v("vue-router 路由管理")])])]),v._v(" "),l("li",[l("p",[v._v("axios 封装 http")])]),v._v(" "),l("li",[l("p",[v._v("echarts 封装图表组件")])]),v._v(" "),l("li",[l("p",[v._v("code mirror 编辑器")])]),v._v(" "),l("li",[l("p",[v._v("element ui")])]),v._v(" "),l("li",[l("p",[v._v("eslint 配置语法规则")])]),v._v(" "),l("li",[l("p",[v._v("githook 配置提交规范")])]),v._v(" "),l("li",[l("p",[v._v("仪表盘 可视化产品 管理制作分享")])]),v._v(" "),l("li",[l("p",[v._v("大屏模板 产品模板")])]),v._v(" "),l("li",[l("p",[v._v("图表库")]),v._v(" "),l("ul",[l("li",[v._v("内置图表")]),v._v(" "),l("li",[v._v("自定义图表 类似 Codepen\n封装了一个加载函数，动态添加 "),l("code",[v._v("script")]),v._v(" 的方式引入需要的插件，在回调函数里面执行操作")])])]),v._v(" "),l("li",[l("p",[v._v("素材管理 色标选项配置数据")])]),v._v(" "),l("li",[l("p",[v._v("数据源 数据源配置")]),v._v(" "),l("ul",[l("li",[v._v("python 返回结果二次处理")])])]),v._v(" "),l("li",[l("p",[v._v("用户管理")])])]),v._v(" "),l("p",[v._v("https://mp.weixin.qq.com/s/af-F2goqnfMEo_yT_yFUMw")]),v._v(" "),l("h2",{attrs:{id:"旅游"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#旅游"}},[v._v("#")]),v._v(" 旅游")]),v._v(" "),l("ul",[l("li",[l("p",[l("code",[v._v("customize-cra")]),v._v(" 修改 "),l("code",[v._v("create react app")]),v._v(" 配置")])]),v._v(" "),l("li",[l("p",[v._v("webpack")]),v._v(" "),l("ul",[l("li",[l("p",[v._v("工具 "),l("code",[v._v("webpack-bundle-analyzer")])])]),v._v(" "),l("li",[l("p",[v._v("体积优化 1.09 M gzip")]),v._v(" "),l("ul",[l("li",[v._v("echarts 300kb -> 158kb\n"),l("ul",[l("li",[v._v("echarts 5.0 以后 示例添加 option 完整代码自动显示按需引用")])])]),v._v(" "),l("li",[v._v("geojson 216kb->36kb echarts 压缩解码 ZigZag")]),v._v(" "),l("li",[v._v("mock.js 49kb -> 0 只有开发时需要")]),v._v(" "),l("li",[l("RouterLink",{attrs:{to:"/engineering/router_lazy.html"}},[v._v("路由懒加载")]),v._v(" 导致每个页面单独打包 -> 相同文件多次引用重复打包 SplitChunksPlugin 体积减小 60kb")],1)])])])]),v._v(" "),l("li",[l("p",[v._v("动画多卡顿")]),v._v(" "),l("ul",[l("li",[v._v("setTimeout 改为 requestAnimationFrame")])])])]),v._v(" "),l("h2",{attrs:{id:"难点"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#难点"}},[v._v("#")]),v._v(" 难点")]),v._v(" "),l("ul",[l("li",[v._v("antd 上传组件 上传图片\n"),l("ul",[l("li",[v._v("需求：\n"),l("ul",[l("li",[v._v("拖拽排序\n"),l("ul",[l("li",[v._v("react-dnd")])])]),v._v(" "),l("li",[v._v("上传图片方式\n"),l("ul",[l("li",[v._v("表单\n"),l("ul",[l("li",[v._v("需要 form 设置 encode-type form-data")]),v._v(" "),l("li",[v._v("会刷新页面，无法处理后台返回")])])]),v._v(" "),l("li",[v._v("formData rc-upload 对 filelist 循环使用\n"),l("ul",[l("li",[v._v("额外参数和文件数据通过 formData.append 添加\n"),l("ul",[l("li",[v._v("如果 axios 封装默认 contenttype 不是 multipart/form-data 需要修改")])])]),v._v(" "),l("li",[v._v("xmlhttprequest")])])])])]),v._v(" "),l("li",[v._v("上传需要附参数\n"),l("ul",[l("li",[v._v("设置 data")])])]),v._v(" "),l("li",[v._v("需要选中图片，点击按钮设置封面背景\n"),l("ul",[l("li",[v._v("点击图片设置选中 使用 border 来标识选中")]),v._v(" "),l("li",[v._v("使用 before after + 绝对定位 内外圈来标识封面背景")]),v._v(" "),l("li",[v._v("接口需要图片 id\n"),l("ul",[l("li",[v._v("组件默认是非受控组件，文件列表状态内部管理")]),v._v(" "),l("li",[v._v("需要用后台返回的文件列表来设置组件状态，受控组件")])])])])]),v._v(" "),l("li",[v._v("图片列表变化 执行上传\n"),l("ul",[l("li",[v._v("onchange 执行操作")])])])])])])])])])}),[],!1,null,null,null);_.default=e.exports}}]);