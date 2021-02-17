/* 全局配置文件 */
module.exports = {
  base: "/Grimoire/", //部署站点的基础路径
  title: "Grimoire", // 标题
  description: "Magic Book",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      { text: "编年史", link: "/annals/" },
      { text: "代码规范", link: "/lint/" },
      { text: "Git", link: "/git/" },
      {
        text: "前端",
        items: [
          { text: "JavaScript", link: "/js/" },
          { text: "Css", link: "/css/" },
          { text: "工程化", link: "/engineering/" },
          { text: "框架", items: [{ text: "Vue", link: "/vue/" }] },
        ],
      },
      { text: "网络", link: "/network/" },
      {
        text: "算法",
        items: [
          { text: "leetcode", link: "/leetcode/" },
          { text: "查找", link: "/find/" },
          { text: "排序", link: "/sort/" },
          { text: "图", link: "/graph/" },
          { text: "树", link: "/tree/" },
          { text: "字符串", link: "/string/" },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      /* 代码规范 */
      "/lint/": [
        {
          collapsable: false,
          children: ["", "css", "js", "js_colon"],
        },
      ],
      /* 代码规范 */

      /* git */
      "/git/": [
        {
          collapsable: false,
          children: ["", "githook", "ssh", "commitLint"],
        },
      ],
      /* git */

      /* 前端 */
      "/js/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础",
              children: [
                "context",
                "closure",
                "cab",
                "class",
                "create",
                "new",
                "prototype",
                "run",
                "this",
                "hoisting",
                "promise",
                "declare",
              ],
            },
            {
              title: "应用",
              children: [
                "json",
                "databind",
                "copy",
                "typeof",
                "debounce",
                "observer",
              ],
            },
          ],
        },
      ],

      "/css/": [
        {
          collapsable: false,
          children: [
            "",
            { title: "基础", children: ["position", "bfc", "box"] },
            {
              title: "布局",
              children: ["flex", "holy_wing", "center", "rdad"],
            },
            { title: "工具", children: ["postcss_rem"] },
            {
              title: "应用",
              children: ["closebutton", "resizediv", "roll", "triangle"],
            },
          ],
        },
      ],

      "/engineering/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础/原理",
              children: ["module", "write_module", "minipack"],
            },
            { title: "应用", children: ["automodule", "download"] },
            {
              title: "工具",
              children: [
                "webpack",
                "yarnBook",
                "npx",
                "semantic_release",
                "package_axios",
                "html2canvas",
                "anywhere",
                "nrm",
              ],
            },
          ],
        },
      ],

      /* 框架 */
      "/vue/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础/原理",
              children: [
                "reactivity",
                "life",
                "vdom",
                "functional",
                "vhook",
                "filter",
                "slot",
                "componentCom",
              ],
            },
            {
              title: "应用",
              children: ["devtools", "performance"],
            },
          ],
        },
      ],
      /* 框架 */

      /* 前端 */

      /* 算法 */
      "/leetcode/": [
        {
          collapsable: false,
          children: [
            "",
            "1",
            "2",
            "3",
            "4",
            "7",
            "8",
            "14",
            "19",
            "20",
            "21",
            "26",
            "28",
            "36",
            "42",
            "48",
            "53",
            "66",
            "88",
            "98",
            "101",
            "102",
            "104",
            "105",
            "108",
            "119",
            "121",
            "122",
            "125",
            "136",
            "141",
            "169",
            "172",
            "189",
            "206",
            "217",
            "234",
            "237",
            "240",
            "242",
            "283",
            "344",
            "350",
            "387",
            "424",
            "448",
            "480",
            "485",
            "561",
            "566",
            "643",
            "665",
            "703",
            "888",
            "978",
            "1208",
            "1423",
          ],
        },
      ],
      "/graph/": [
        {
          collapsable: false,
          children: ["", "euler"],
        },
      ],
      "/sort/": [
        {
          collapsable: false,
          children: ["", "radix", "quick"],
        },
      ],
      "/find/": [
        {
          collapsable: false,
          children: ["", "bs"],
        },
      ],
      "/tree/": [
        {
          collapsable: false,
          children: ["", "backtrack", "btQs", "btTravers"],
        },
      ],
      "/string/": [
        {
          collapsable: false,
          children: ["", "kmp"],
        },
      ],
      "/linkedlist/": [
        {
          collapsable: false,
          children: [""],
        },
      ],

      /* 算法 */

      /* 网络 */
      "/network/": [
        {
          title: "网络",
          collapsable: false,
          children: [
            "http",
            "socket",
            "get_post",
            "cookie",
            "storage",
            "crossdomain",
          ],
        },
      ],
      /* 网络 */
    },
  },
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
    [
      "demo-code",
      {
        /* Js libraries for the demo */
        // jsLibs: [
        //   // umd
        //   "https://unpkg.com/tua-storage/dist/TuaStorage.umd.js"
        // ],
        /* Css libraries for the demo. */
        // cssLibs: ["https://unpkg.com/animate.css@3.7.0/animate.min.css"],

        /* The display text of unfold code button. */
        showText: "show",
        /* The display text of fold code button. */
        hideText: "hide",

        // styleStr: "text-decoration: underline;",

        /* The height of the code when it is folded. */
        minHeight: 200,

        /* Display online edit buttons. */
        onlineBtns: {
          codepen: false,
          jsfiddle: false,
          codesandbox: false,
        },

        /* It passes CodeSandbox options. */
        // codesandbox: {
        //   deps: { lodash: "latest" },
        //   json: "",
        //   query: "",
        //   embed: ""
        // },
        /* The mark of the plugin, follows the tag after ::: */
        // demoCodeMark: "demo-code"
        /* It passes vuepress-plugin-code-copy's options, or false to disable it. */
        // copyOptions: { ... },
      },
    ],
  ],
};
