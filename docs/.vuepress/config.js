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
          { text: "浏览器", link: "/explorer/" },
          { text: "工程化", link: "/engineering/" },
          {
            text: "框架",
            items: [
              { text: "Vue", link: "/vue/" },
              { text: "React", link: "/react/" },
            ],
          },
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
          children: ["", "doc", "githook", "ssh", "commitLint"],
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
                "event",
                "encode",
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
                "arrayunique",
                "tag",
                "route",
                "flat",
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
            {
              title: "基础",
              children: ["position", "bfc", "box", "word", "offset"],
            },
            {
              title: "布局",
              children: ["flex", "holy_wing", "center", "rdad"],
            },
            { title: "工具", children: ["postcss_rem"] },
            {
              title: "应用",
              children: [
                "closebutton",
                "resizediv",
                "roll",
                "triangle",
                "dragdiv",
              ],
            },
          ],
        },
      ],

      "/explorer/": [
        {
          collapsable: false,
          children: ["", "render"],
        },
      ],

      "/engineering/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础/原理",
              children: ["module", "write_module", "minipack", "mvx"],
            },
            {
              title: "应用",
              children: ["automodule", "download", "eventemitter"],
            },
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
      "/react/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础/原理",
              children: [],
            },
            {
              title: "应用",
              children: [],
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
            "23",
            "26",
            "28",
            "36",
            "42",
            "48",
            "53",
            "54",
            "59",
            "66",
            "70",
            "85",
            "88",
            "92",
            "94",
            "98",
            "100",
            "101",
            "102",
            "104",
            "105",
            "106",
            "108",
            "111",
            "112",
            "119",
            "121",
            "122",
            "125",
            "129",
            "131",
            "136",
            "139",
            "140",
            "141",
            "144",
            "145",
            "147",
            "169",
            "172",
            "189",
            "191",
            "198",
            "200",
            "206",
            "208",
            "217",
            "226",
            "227",
            "234",
            "236",
            "237",
            "240",
            "242",
            "278",
            "283",
            "304",
            "323",
            "331",
            "338",
            "344",
            "350",
            "384",
            "387",
            "424",
            "448",
            "480",
            "485",
            "506",
            "509",
            "561",
            "566",
            "589",
            "590",
            "643",
            "665",
            "684",
            "697",
            "703",
            "766",
            "802",
            "832",
            "867",
            "888",
            "889",
            "896",
            "912",
            "978",
            "1004",
            "1008",
            "1028",
            "1047",
            "1052",
            "1208",
            "1423",
            "1438",
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
          children: [
            "",
            "bubble",
            "select",
            "insert",
            "shell",
            "heap",
            "quick",
            "merge",
            "radix",
          ],
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
          children: ["", "backtrack", "btQs", "btTravers", "dfs"],
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
            "dns",
            "xss",
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
