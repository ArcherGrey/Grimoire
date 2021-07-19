(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{454:function(t,s,a){"use strict";a.r(s);var n=a(19),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"资源预加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资源预加载"}},[t._v("#")]),t._v(" 资源预加载")]),t._v(" "),a("p",[a("strong",[t._v("只是预加载，加载完成后不会执行")])]),t._v(" "),a("p",[a("code",[t._v("preload")]),t._v(":对于当前页面很有必要的资源使用 (关键的脚本、字体、主要图片)")]),t._v(" "),a("p",[a("code",[t._v("prefetch")]),t._v(":对于可能在将来的页面中使用的资源使用")]),t._v(" "),a("ul",[a("li",[t._v("从一个页面跳转到另一个页面 "),a("code",[t._v("prefetch")]),t._v(" 的请求不会中断")]),t._v(" "),a("li",[t._v("至少会缓存 5 分钟")])]),t._v(" "),a("h2",{attrs:{id:"缓存行为"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存行为"}},[t._v("#")]),t._v(" 缓存行为")]),t._v(" "),a("p",[a("code",[t._v("Chrome")]),t._v(" 有四种缓存:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("HTTP")]),t._v(" 缓存")]),t._v(" "),a("li",[t._v("内存缓存")]),t._v(" "),a("li",[a("code",[t._v("Service Worker")]),t._v(" 缓存")]),t._v(" "),a("li",[a("code",[t._v("Push")]),t._v(" 缓存")])]),t._v(" "),a("p",[a("code",[t._v("preload")]),t._v(" 和 "),a("code",[t._v("prefetch")]),t._v(" 都被存储在 "),a("code",[t._v("HTTP")]),t._v(" 缓存中。")]),t._v(" "),a("ol",[a("li",[t._v("当一个资源被 "),a("code",[t._v("preload")]),t._v(" 或者 "),a("code",[t._v("prefetch")]),t._v(" 获取后，它可以从 "),a("code",[t._v("HTTP")]),t._v(" 缓存移动至渲染器的内存缓存中。")]),t._v(" "),a("li",[t._v("如果资源可以被缓存（比如说存在有效的 "),a("code",[t._v("cache-control")]),t._v(" 和 "),a("code",[t._v("max-age")]),t._v("），它被存储在 "),a("code",[t._v("HTTP")]),t._v(" 缓存中可以被现在或将来的任务使用，如果资源不能被缓存在 "),a("code",[t._v("HTTP")]),t._v(" 缓存中，作为代替，它被放在内存缓存中直到被使用。")])]),t._v(" "),a("h2",{attrs:{id:"优先级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优先级"}},[t._v("#")]),t._v(" 优先级")]),t._v(" "),a("img",{attrs:{src:t.$withBase("/eng_preload_1.png"),alt:"优先级"}}),t._v(" "),a("p",[a("code",[t._v("preload")]),t._v(" 使用 "),a("code",[t._v("as")]),t._v(" 属性加载的资源将会获得与资源 "),a("code",[t._v("type")]),t._v(" 属性所拥有的相同的优先级。比如说，"),a("code",[t._v('preload as="style"')]),t._v(" 将会获得比 "),a("code",[t._v('as="script"')]),t._v(" 更高的优先级。这些资源同样会受内容安全策略的影响（比如说，脚本会受到其 "),a("code",[t._v("src")]),t._v(" 属性的影响）。")]),t._v(" "),a("p",[t._v("不带 "),a("code",[t._v("as")]),t._v(" 属性的 "),a("code",[t._v("preload")]),t._v(" 的优先级将会等同于异步请求。")]),t._v(" "),a("h2",{attrs:{id:"问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),a("ol",[a("li",[t._v("没有用到的 "),a("code",[t._v("preload")]),t._v(" 资源在 "),a("code",[t._v("Chrome")]),t._v(" 的 "),a("code",[t._v("Console")]),t._v(" 里会在 "),a("code",[t._v("onload")]),t._v(" 3s 后发生警告")])]),t._v(" "),a("p",[t._v("需要明确 "),a("code",[t._v("preload")]),t._v(" 是一定会用到的资源，否则相当于浪费了流量")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("错误使用可能导致二次获取")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("prefetch")]),t._v(" 不要作为 "),a("code",[t._v("preload")]),t._v(" 的后备，它们适用于不同场景")]),t._v(" "),a("li",[t._v("明确 "),a("code",[t._v("as")]),t._v(" 属性使用")]),t._v(" "),a("li",[t._v("添加 "),a("code",[t._v("crossorigin")]),t._v(" 属性")])]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[t._v("不要预加载所有文件")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("preload")]),t._v(" 关键文件（可能阻塞加载的，例如图片、样式、字体、媒体资源）")])]),t._v(" "),a("h2",{attrs:{id:"应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用"}},[t._v("#")]),t._v(" 应用")]),t._v(" "),a("h3",{attrs:{id:"检测是否支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#检测是否支持"}},[t._v("#")]),t._v(" 检测是否支持")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("preloadSupported")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" link "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"link"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" relList "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("relList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("relList "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("relList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("supports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" relList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("supports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"preload"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h3",{attrs:{id:"脚本化预加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#脚本化预加载"}},[t._v("#")]),t._v(" 脚本化预加载")]),t._v(" "),a("p",[t._v("在这里创建一个 "),a("code",[t._v("HTMLLinkElement")]),t._v(" 实例，然后将他们附加到 "),a("code",[t._v("DOM")]),t._v(" 上:")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这意味着浏览器将预加载这个JavaScript文件，但并不实际执行它。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" preloadLink "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"link"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npreloadLink"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("href "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myscript.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npreloadLink"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rel "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"preload"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npreloadLink"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("as "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("head"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("preloadLink"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("如果要对其加以执行，在需要的时候，你可以执行：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" preloadedScript "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npreloadedScript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myscript.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("preloadedScript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("当你需要预加载一个脚本，但需要推迟到需要的时候才令其执行时，这种方式会特别有用。")]),t._v(" "),a("h3",{attrs:{id:"加载完成立即生效"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#加载完成立即生效"}},[t._v("#")]),t._v(" 加载完成立即生效")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- css --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("preload"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("style.css"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onload")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("this.rel=stylesheet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- script --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("preload"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("as")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("script"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("async_script.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onload")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("var script = document.createElement("),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("); script.src = this.href; document.body.appendChild(script);"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);