(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{468:function(t,_,v){"use strict";v.r(_);var e=v(19),a=Object(e.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"浏览器渲染流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染流程"}},[t._v("#")]),t._v(" 浏览器渲染流程")]),t._v(" "),v("p",[t._v("渲染引擎首先通过网络获得所请求文档的内容，通常以 "),v("code",[t._v("8k")]),t._v(" 分块的方式完成。")]),t._v(" "),v("p",[t._v("在取得内容之后的基本流程：")]),t._v(" "),v("ol",[v("li",[t._v("解析 "),v("code",[t._v("Html")]),t._v(" 构建 "),v("code",[t._v("DOM")]),t._v(" 树：渲染引擎开始解析 "),v("code",[t._v("html")]),t._v(" 并将标签转化为内容树中的 "),v("code",[t._v("DOM")]),t._v(" 节点")]),t._v(" "),v("li",[t._v("构建 "),v("code",[t._v("render")]),t._v(" 树：解析外部 "),v("code",[t._v("css")]),t._v(" 和 "),v("code",[t._v("style")]),t._v(" 标签中的样式信息，这些样式信息和 "),v("code",[t._v("html")]),t._v(" 中的可见性指令将被用来构建 "),v("code",[t._v("render")]),t._v(" 树，"),v("code",[t._v("render")]),t._v(" 树由包含颜色和大小等属性的矩形组成，它们将被按照正确的顺序显示到屏幕上")]),t._v(" "),v("li",[t._v("布局 "),v("code",[t._v("render")]),t._v(" 树：构建好了以后，将会执行布局过程，将确定每个节点在屏幕上的确切坐标")]),t._v(" "),v("li",[t._v("绘制 "),v("code",[t._v("render")]),t._v(" 树：最后就是绘制，遍历 "),v("code",[t._v("render")]),t._v(" 树，并使用 "),v("code",[t._v("UI")]),t._v(" 后端层绘制每一个节点")])]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_1.png"),alt:"基本流程"}}),t._v(" "),v("p",[t._v("为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等所有 "),v("code",[t._v("html")]),t._v(" 都解析完成之后再去构建和布局 "),v("code",[t._v("render")]),t._v(" 树，它是解析一部分内容就显示一部分内容，同时可能还在通过网络下载其余内容。")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_2.png"),alt:"不同引擎流程"}}),t._v(" "),v("p",[t._v("可以看到，尽管 "),v("code",[t._v("webkit")]),t._v(" 和 "),v("code",[t._v("Gecko")]),t._v(" 使用的术语稍有不同，但是主要流程基本相同，"),v("code",[t._v("Gecko")]),t._v(" 称可见的格式化元素组成的树为 "),v("code",[t._v("frame")]),t._v(" 树，每个元素都是一个 "),v("code",[t._v("frame")]),t._v(" ，"),v("code",[t._v("webkit")]),t._v(" 则使用 "),v("code",[t._v("render")]),t._v(" 树来命名由渲染对象组成的树，"),v("code",[t._v("webkit")]),t._v(" 中元素的定位称为布局，而 "),v("code",[t._v("Gecko")]),t._v(" 中称为回流，"),v("code",[t._v("webkit")]),t._v(" 称利用 "),v("code",[t._v("dom")]),t._v(" 节点和样式去构建 "),v("code",[t._v("render")]),t._v(" 树的过程为 "),v("code",[t._v("attachment")]),t._v(" ，"),v("code",[t._v("Gecko")]),t._v(" 在 "),v("code",[t._v("html")]),t._v(" 和 "),v("code",[t._v("dom")]),t._v(" 树之间附加了一层，称为内容接收器，相当于制造 "),v("code",[t._v("dom")]),t._v(" 元素的工厂。")]),t._v(" "),v("h2",{attrs:{id:"解析和-dom-树构建"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解析和-dom-树构建"}},[t._v("#")]),t._v(" 解析和 "),v("code",[t._v("DOM")]),t._v(" 树构建")]),t._v(" "),v("p",[t._v("解析一个文档即将其转换为具有一定意义的结构，解析的结果通常是表达文档结构的节点树，称为解析树或者语法树。")]),t._v(" "),v("p",[t._v("例如，解析 "),v("code",[t._v("2 + 3 - 1")]),t._v("，可能返回这样一棵树：")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_3.png"),alt:"数学表达书1"}}),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("文法（Grammars）")]),t._v(" "),v("p",[t._v("解析基于文档依据的语法规则，每种可被解析的格式必须具有由词汇和语法规则组成的特定的文法，称为上下文无关文法。（人类语言不具有这一特性，因此不能被一般的解析技术所解析）")])]),t._v(" "),v("h3",{attrs:{id:"解析过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解析过程"}},[t._v("#")]),t._v(" 解析过程")]),t._v(" "),v("p",[t._v("解析器（"),v("code",[t._v("Parser")]),t._v("）解析分为两个子过程：")]),t._v(" "),v("ul",[v("li",[t._v("语法分析：就是将输入分解为符号")]),t._v(" "),v("li",[t._v("词法分析：对语言应用语法规则")])]),t._v(" "),v("p",[t._v("解析器一般先把输入分解为合法的符号，在根据语言的语法规则分析文档结构，从而构建解析树：")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_4.png"),alt:"从源文档到解析树"}}),t._v(" "),v("p",[t._v("解析过程是迭代的，解析器取到一个新的符号，用这个符号去匹配一条语法规则，如果匹配了将对应的节点添加到解析树上，然后解析树继续请求下一个符号，如果没有匹配，解析器将在内部保存该符号，然后取下一个符号，直到所有内部保存的符号能够匹配一项语法规则，如果最终没有找到匹配的规则，解析器将抛出一个异常，这意味着文档无效或者包含语法错误。")]),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("转译（Translation）")]),t._v(" "),v("p",[t._v("很多时候，解析树不是最终结果，解析一般在转换中使用，例如编译过程就是先将源码解析为解析树然后将解析树转换为机器码文档：")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_5.png"),alt:"编译流程"}})]),t._v(" "),v("h3",{attrs:{id:"解析器类型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解析器类型"}},[t._v("#")]),t._v(" 解析器类型")]),t._v(" "),v("ul",[v("li",[t._v("自顶向下：查看语法的最高层结构试着匹配其中一个")]),t._v(" "),v("li",[t._v("自底向上：从输出开始逐步将其转换为语法规则，从底层规则开始匹配到高层规则")])]),t._v(" "),v("p",[t._v("例子："),v("code",[t._v("2 + 3 - 1")])]),t._v(" "),v("p",[t._v("自顶向下：先识别出 "),v("code",[t._v("2+3")]),t._v(" 视为一个表达式，然后识别出 "),v("code",[t._v("2+3-1")]),t._v(" 为一个表达式")]),t._v(" "),v("p",[t._v("自底向上：解析扫描输入直到匹配了一条规则，然后用该规则取代匹配的输入，直到解析完所有输入。部分匹配的表达式被放置在解析堆栈中")]),t._v(" "),v("p",[t._v("输入从左向右移动（一个指针首先指向输入开始处，然后向右移动）：")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("stack")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("input")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("null")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("2+3-1")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("匹配常量")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("+3-1")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("常量 运算符")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("3-1")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("表达式")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-1")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("表达式 运算符")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("1")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("表达式")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("null")])])])]),t._v(" "),v("h3",{attrs:{id:"html-解析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#html-解析"}},[t._v("#")]),t._v(" "),v("code",[t._v("html")]),t._v(" 解析")]),t._v(" "),v("p",[t._v("输出的树也就是解析树，是由 "),v("code",[t._v("DOM")]),t._v(" 元素和属性节点组成的，树的根是 "),v("code",[t._v("document")]),t._v(" 对象。")]),t._v(" "),v("p",[v("code",[t._v("DOM")]),t._v(" 和标签基本是一一对应关系，例如下面的标签：")]),t._v(" "),v("div",{staticClass:"language-html line-numbers-mode"},[v("pre",{pre:!0,attrs:{class:"language-html"}},[v("code",[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("hello"),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),v("span",{pre:!0,attrs:{class:"token attr-value"}},[v("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("1.png"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token tag"}},[v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),v("div",{staticClass:"line-numbers-wrapper"},[v("span",{staticClass:"line-number"},[t._v("1")]),v("br"),v("span",{staticClass:"line-number"},[t._v("2")]),v("br"),v("span",{staticClass:"line-number"},[t._v("3")]),v("br"),v("span",{staticClass:"line-number"},[t._v("4")]),v("br"),v("span",{staticClass:"line-number"},[t._v("5")]),v("br"),v("span",{staticClass:"line-number"},[t._v("6")]),v("br"),v("span",{staticClass:"line-number"},[t._v("7")]),v("br"),v("span",{staticClass:"line-number"},[t._v("8")]),v("br")])]),v("p",[t._v("将会被转换为下面的 "),v("code",[t._v("DOM")]),t._v(" 树：")]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_6.png"),alt:"DOM树"}}),t._v(" "),v("p",[v("code",[t._v("html")]),t._v(" 不能被一般的自顶向下或自底向上的解析器所解析，因为：")]),t._v(" "),v("ul",[v("li",[t._v("语言本身的宽容特性")]),t._v(" "),v("li",[t._v("浏览器对一些常见的非法语法有容错机制")]),t._v(" "),v("li",[t._v("解析过程是往复的，通常源码不会再解析过程中发生改变，但在 "),v("code",[t._v("html")]),t._v(" 中，脚本标签中的内容可能会有修改")])]),t._v(" "),v("p",[t._v("浏览器为其定制了专属的解析器，"),v("code",[t._v("html5")]),t._v(" 规范中描述了这个算法，包含两个阶段：")]),t._v(" "),v("ul",[v("li",[t._v("符号化：词法分析的过程，将输入解析为符号，包含开始标签、结束标签、属性名和属性值")]),t._v(" "),v("li",[t._v("构建树：符号识别器识别出符号后，将其传递给构建器，然后读取下一个字符，直到所有输入都处理完")])]),t._v(" "),v("img",{attrs:{src:t.$withBase("/explorer_render_7.png"),alt:"html解析流程"}}),t._v(" "),v("h3",{attrs:{id:"处理脚本和样式表的顺序"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#处理脚本和样式表的顺序"}},[t._v("#")]),t._v(" 处理脚本和样式表的顺序")]),t._v(" "),v("ul",[v("li",[t._v("脚本\n"),v("ul",[v("li",[t._v("解析器遇到 "),v("code",[t._v("<script>")]),t._v(" 标签的时候，文档停止解析\n"),v("ul",[v("li",[t._v("内部脚本会等待脚本执行完毕")]),t._v(" "),v("li",[t._v("外部脚本会从网络抓取资源完成后继续")])])]),t._v(" "),v("li",[t._v("可以在 "),v("code",[t._v("<script>")]),t._v(" 标签上添加 "),v("code",[t._v("defer")]),t._v(" 属性，这样就不会停止文档解析，而是等待解析结束后执行")]),t._v(" "),v("li",[v("code",[t._v("html5")]),t._v(" 增加了 "),v("code",[t._v("async")]),t._v(" 属性，可以将脚本标记为异步，也不会阻塞解析")])])]),t._v(" "),v("li",[t._v("样式表 理论上样式表不会修改 "),v("code",[t._v("DOM")]),t._v(" 树，似乎没有必要等待样式表并停止文档解析，但是脚本可能会请求样式信息，如果这时还没解析样式，那么脚本就会得到错误的信息\n"),v("ul",[v("li",[v("code",[t._v("Firefox")]),t._v(" 在样式表加载和解析的过程中，会禁止所有脚本")]),t._v(" "),v("li",[v("code",[t._v("WebKit")]),t._v(" 仅当脚本尝试访问样式属性可能受到尚未加载的样式表影响时，才会禁止该脚本")])])])]),t._v(" "),v("h2",{attrs:{id:"渲染树构建"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#渲染树构建"}},[t._v("#")]),t._v(" 渲染树构建")]),t._v(" "),v("p",[t._v("在 "),v("code",[t._v("DOM")]),t._v(" 树构建完成时，浏览器开始构建渲染树，渲染树由元素显示序列中的可见元素组成，它是文档的可视化表示，构建这颗树是为了以正确的顺序绘制文档内容。")]),t._v(" "),v("p",[t._v("渲染对象和 "),v("code",[t._v("DOM")]),t._v(" 元素对应，但不是一一对应，不可见的元素不会被插入渲染树，例如 "),v("code",[t._v("head")]),t._v(" 元素，"),v("code",[t._v("display:none")]),t._v(" （"),v("code",[t._v("visibility:hidden")]),t._v(" 将会出现在渲染树中）。")]),t._v(" "),v("p",[t._v("还有一些元素对应几个可见对象，一般是具有复杂结构的元素，一些渲染对象和对应的节点不在树上相同的位置，例如浮动和绝对定位的元素在文本流之外，在两棵树上的位置不同，渲染树上标示出真实的结构，并用一个占位结构标示出原来的位置。")]),t._v(" "),v("p",[t._v("创建树的流程：")]),t._v(" "),v("ul",[v("li",[v("code",[t._v("firefox")]),t._v(" 表述为一个监听 "),v("code",[t._v("Dom")]),t._v(" 更新的监听器，通过 "),v("code",[t._v("Frame Constructor")]),t._v(" 根据样式创建 "),v("code",[t._v("frame")])]),t._v(" "),v("li",[v("code",[t._v("webkit")]),t._v(" 通过 "),v("code",[t._v("attachment")]),t._v(" 过程将节点插入到树中")])]),t._v(" "),v("h2",{attrs:{id:"布局"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#布局"}},[t._v("#")]),t._v(" 布局")]),t._v(" "),v("p",[t._v("当渲染对象被创建并添加到树中，它们并没有位置和大小，计算这些值的过程被称为布局（"),v("code",[t._v("layout")]),t._v("）或者回流（"),v("code",[t._v("reflow")]),t._v("）。")]),t._v(" "),v("p",[v("code",[t._v("html")]),t._v(" 使用基于流的布局模型，意味着大部分时间，可以以单一的途径进行几何计算。流中靠后的元素并不会影响前面元素的几何特性，所以布局可以在文档中从右向左自上而下的进行。")]),t._v(" "),v("p",[t._v("布局是一个递归的过程，由根渲染对象开始，它对应 "),v("code",[t._v("html")]),t._v(" 文档元素，布局继续递归的通过一些或所有 "),v("code",[t._v("frame")]),t._v(" 层级，为每个需要几何信息的渲染对象进行计算。")]),t._v(" "),v("p",[t._v("根渲染对象的坐标是 "),v("code",[t._v("0,0")]),t._v(" ，大小是 "),v("code",[t._v("viewport - 浏览器窗口可见部分")])]),t._v(" "),v("p",[t._v("所有渲染对象都有一个 "),v("code",[t._v("layout")]),t._v(" 或者 "),v("code",[t._v("reflow")]),t._v(" 方法，每个渲染对象调用需要布局的 "),v("code",[t._v("children")]),t._v(" 的 "),v("code",[t._v("layout")]),t._v(" 方法。")]),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("dirty bit")]),t._v(" "),v("p",[t._v("为了不因为每个小变化都全部重新布局，浏览器使用了一个 "),v("code",[t._v("dirty bit")]),t._v(" 系统，一个渲染对象发生了变化或是被添加了，就标记它和它的 "),v("code",[t._v("children")]),t._v(" 为 "),v("code",[t._v("dirty")]),t._v(" ，所有被标记的渲染对象都需要重新布局")])]),t._v(" "),v("h3",{attrs:{id:"过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#过程"}},[t._v("#")]),t._v(" 过程")]),t._v(" "),v("p",[t._v("布局分为两种情况：")]),t._v(" "),v("ul",[v("li",[t._v("全局：整颗渲染树触发 "),v("code",[t._v("layout")]),t._v("，一般是同步触发\n"),v("ul",[v("li",[t._v("一个全局样式改变影响所有渲染对象，比如字体改变")]),t._v(" "),v("li",[t._v("窗口 "),v("code",[t._v("resize")])])])]),t._v(" "),v("li",[t._v("增量：只有被标记 "),v("code",[t._v("dirty")]),t._v(" 的渲染对象会重新布局，一般是异步，在脚本请求样式信息，比如 "),v("code",[t._v("offsetHeight")]),t._v(" 会同步触发增量布局")])]),t._v(" "),v("p",[t._v("过程一般为下面几个部分：")]),t._v(" "),v("ol",[v("li",[v("code",[t._v("parent")]),t._v(" 渲染对象决定它的宽度")]),t._v(" "),v("li",[v("code",[t._v("parent")]),t._v(" 渲染对象读取 "),v("code",[t._v("children")]),t._v(" 然后：")])]),t._v(" "),v("ul",[v("li",[t._v("放置 "),v("code",[t._v("child")]),t._v(" 渲染对象")]),t._v(" "),v("li",[t._v("在需要时调用 "),v("code",[t._v("child")]),t._v(" 渲染对象")]),t._v(" "),v("li",[v("code",[t._v("parent")]),t._v(" 渲染对象使用 "),v("code",[t._v("child")]),t._v(" 渲染对象的累积高度，以及 "),v("code",[t._v("margin")]),t._v(" 和 "),v("code",[t._v("padding")]),t._v(" 的高度来设置自己的高度")]),t._v(" "),v("li",[t._v("将 "),v("code",[t._v("dirty")]),t._v(" 标识设置为 "),v("code",[t._v("false")])])]),t._v(" "),v("h3",{attrs:{id:"宽度计算"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#宽度计算"}},[t._v("#")]),t._v(" 宽度计算")]),t._v(" "),v("p",[t._v("渲染对象的宽度使用容器的宽度、渲染对象样式中的宽度以及 "),v("code",[t._v("margin")]),t._v("、"),v("code",[t._v("border")]),t._v(" 进行计算。")]),t._v(" "),v("p",[v("code",[t._v("webkit")]),t._v(" 中宽度的计算过程：")]),t._v(" "),v("ul",[v("li",[t._v("容器的宽度是容器的可用宽度和 0 中的最大值，可用宽度为： "),v("code",[t._v("contentWidth = clientWidth() - paddingLeft() - paddingRight()")]),t._v("，其中 "),v("code",[t._v("clientWidth")]),t._v(" 代表一个对象内部的不包括 "),v("code",[t._v("border")]),t._v(" 和滑动条的宽度")]),t._v(" "),v("li",[t._v("元素的宽度指样式属性的 "),v("code",[t._v("width")]),t._v(" ，它可以通过计算容器的百分比得到一个绝对值")]),t._v(" "),v("li",[t._v("加上水平方向上的 "),v("code",[t._v("border")]),t._v(" 和 "),v("code",[t._v("padding")])])]),t._v(" "),v("p",[t._v("到这里是最佳宽度的计算过程，如果最佳宽度大于最大宽度则使用最大宽度，如果小于最小宽度则使用最小宽度，最后缓存这个值，在需要布局但宽度未变时使用。")]),t._v(" "),v("h2",{attrs:{id:"绘制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#绘制"}},[t._v("#")]),t._v(" 绘制")]),t._v(" "),v("p",[t._v("在绘制阶段，系统会遍历呈现树，并调用呈现器的 "),v("code",[t._v("paint")]),t._v(" 方法，将呈现器的内容显示在屏幕上。绘制工作是使用用户界面基础组件完成的。")]),t._v(" "),v("ul",[v("li",[t._v("全局绘制")]),t._v(" "),v("li",[t._v("增量绘制")])]),t._v(" "),v("p",[t._v("绘制顺序（元素进入堆栈样式上下文的顺序，堆栈会从后往前绘制）：")]),t._v(" "),v("ol",[v("li",[t._v("背景颜色")]),t._v(" "),v("li",[t._v("背景图片")]),t._v(" "),v("li",[t._v("边框")]),t._v(" "),v("li",[t._v("子代")]),t._v(" "),v("li",[t._v("轮廓")])]),t._v(" "),v("p",[t._v("在重新绘制之前，"),v("code",[t._v("WebKit")]),t._v(" 会将原来的矩形另存为一张位图("),v("code",[t._v("Bitmap")]),t._v(")，然后只绘制新旧矩形之间的差异部分")]),t._v(" "),v("p",[t._v("在发生变化时，浏览器会尽可能做出最小的响应。因此，元素的颜色改变后，只会对该元素进行重绘。元素的位置改变后，只会对该元素及其子元素（可能还有同级元素）进行布局和重绘。添加 DOM 节点后，会对该节点进行布局和重绘。一些重大变化（例如增大元素的字体）会导致缓存无效，使得整个呈现树都会进行重新布局和绘制。")])])}),[],!1,null,null,null);_.default=a.exports}}]);