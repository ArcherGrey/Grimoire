(window.webpackJsonp=window.webpackJsonp||[]).push([[231],{629:function(s,t,a){"use strict";a.r(t);var n=a(19),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"react-性能优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-性能优化"}},[s._v("#")]),s._v(" react 性能优化")]),s._v(" "),a("h2",{attrs:{id:"react-memo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-memo"}},[s._v("#")]),s._v(" "),a("code",[s._v("React.memo")])]),s._v(" "),a("p",[s._v("如果你的组件在相同 "),a("code",[s._v("props")]),s._v(" 的情况下渲染相同的结果，那么你可以通过将其包装在 "),a("code",[s._v("React.memo")]),s._v(" 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，"),a("code",[s._v("React")]),s._v(" 将跳过渲染组件的操作并直接复用最近一次渲染的结果。")]),s._v(" "),a("p",[s._v("默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现:")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("MyComponent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("props")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 使用 props 渲染 */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("areEqual")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("prevProps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" nextProps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n  如果把 nextProps 传入 render 方法的返回结果与\n  将 prevProps 传入 render 方法的返回结果一致则返回 true，\n  否则返回 false\n  */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" React"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("memo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("MyComponent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" areEqual"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("h2",{attrs:{id:"usememo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usememo"}},[s._v("#")]),s._v(" "),a("code",[s._v("useMemo")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" memoizedValue "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("useMemo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("computeExpensiveValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("把“创建”函数和依赖项数组作为参数传入 "),a("code",[s._v("useMemo")]),s._v("，它仅会在某个依赖项改变时才重新计算 "),a("code",[s._v("memoized")]),s._v(" 值。这种优化有助于避免在每次渲染时都进行高开销的计算。")]),s._v(" "),a("p",[s._v("传入 "),a("code",[s._v("useMemo")]),s._v(" 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 "),a("code",[s._v("useEffect")]),s._v(" 的适用范畴，而不是 "),a("code",[s._v("useMemo")]),s._v("。")]),s._v(" "),a("p",[s._v("如果没有提供依赖项数组，"),a("code",[s._v("useMemo")]),s._v(" 在每次渲染时都会计算新的值。")])])}),[],!1,null,null,null);t.default=e.exports}}]);