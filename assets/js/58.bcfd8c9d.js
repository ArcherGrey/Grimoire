(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{459:function(t,e,s){"use strict";s.r(e);var a=s(19),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"sourcemap"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sourcemap"}},[t._v("#")]),t._v(" sourcemap")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("概念")]),t._v(" "),s("p",[t._v("调试原始源代码会比浏览器下载的转换后的代码更加容易。 "),s("code",[t._v("source map")]),t._v(" 是从已转换的代码映射到原始源的文件，使浏览器能够重构原始源并在调试器中显示重建的原始源。")])]),t._v(" "),s("h2",{attrs:{id:"配置关键字"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置关键字"}},[t._v("#")]),t._v(" 配置关键字")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("关键字")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("含义")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("特点")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("注")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("source-map")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("产生 "),s("code",[t._v(".map")]),t._v(" 文件")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("最精确 体积最大")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("eval")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("使用 "),s("code",[t._v("eval")]),t._v(" 包裹模块代码")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("会缓存 提高性能")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("cheap")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("不包含列信息也不包含 "),s("code",[t._v("loader")]),t._v(" 的 "),s("code",[t._v("sourcemap")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("只能定位到行 体积缩小")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("babel")]),t._v(" 转义过只能定位到转换后的代码")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("module")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("包含 "),s("code",[t._v("loader")]),t._v(" 的 "),s("code",[t._v("sourcema")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("可以定位 "),s("code",[t._v("loader")]),t._v(" 处理前的源码")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("inline")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("将 "),s("code",[t._v(".map")]),t._v(" 作为 "),s("code",[t._v("DataURI")]),t._v(" 嵌入，不单独生成文件")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("减少文件数")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}})])])]),t._v(" "),s("p",[t._v("最佳实践：")]),t._v(" "),s("ul",[s("li",[t._v("开发环境："),s("code",[t._v("cheap-module-eval-source-map")]),t._v(" "),s("ul",[s("li",[t._v("快："),s("code",[t._v("eval")])]),t._v(" "),s("li",[t._v("信息尽可能全："),s("code",[t._v("module")])])])]),t._v(" "),s("li",[t._v("生产环境："),s("code",[t._v("hidden-source-map")]),t._v(" "),s("ul",[s("li",[t._v("平时不暴露 "),s("code",[t._v("source-map")]),t._v(" 只有错误信息跟踪会有")])])])]),t._v(" "),s("h2",{attrs:{id:"如何映射"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何映射"}},[t._v("#")]),t._v(" 如何映射")]),t._v(" "),s("p",[t._v("源文件：")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" c "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("输入内容：")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  c "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[s("code",[t._v("map")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language-json line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"file"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script-min.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lineCount"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"mappings"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sources"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"names"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"b"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"c"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])]),s("p",[t._v("其中字段含义：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("字段")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("含义")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("version")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("Source map")]),t._v(" 的版本")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("file")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("转换后的文件名")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("sources")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("源文件")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("names")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("源文件的所有变量名")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("mappings")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("位置信息")])])])]),t._v(" "),s("p",[t._v("解决问题：")]),t._v(" "),s("ul",[s("li",[t._v("输出后位置元素的列号特别大\n"),s("ul",[s("li",[t._v("通过相对位置来解决")])])]),t._v(" "),s("li",[t._v("存储映射信息的数据结构大小\n"),s("ul",[s("li",[s("code",[t._v("base64-VLQ")]),t._v(" 编码")])])])]),t._v(" "),s("p",[s("RouterLink",{attrs:{to:"/engineering/encode.html"}},[t._v("base64")])],1),t._v(" "),s("p",[t._v("对数字进行 "),s("code",[t._v("VLQ")]),t._v(" 编码，使用 "),s("code",[t._v("base64")]),t._v(" 标识编码结果")])])}),[],!1,null,null,null);e.default=n.exports}}]);