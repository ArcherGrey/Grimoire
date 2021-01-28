/* 全局配置文件 */
module.exports = {
  base: "/Grimoire/", //部署站点的基础路径
  title: "Grimoire", // 标题
  description: "Magic Book",
  markdown: {
    lineNumbers: true
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
          { text: "框架", items: [{ text: "Vue", link: "/vue/" }] }
        ]
      },
      { text: "网络", link: "/network/" },
      { text: "算法", items: [{ text: "leetcode", link: "/leetcode/" }] }
    ],
    sidebarDepth: 3,
    sidebar: {
      /* 代码规范 */
      "/lint/": [
        {
          collapsable: false,
          children: ["", "css", "js", "js_colon"]
        }
      ],
      /* 代码规范 */

      /* git */
      "/git/": [
        {
          collapsable: false,
          children: ["", "githook", "ssh", "commitLint"]
        }
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
                "declare"
              ]
            },
            {
              title: "应用",
              children: [
                "json",
                "databind",
                "copy",
                "typeof",
                "debounce",
                "observer"
              ]
            }
          ]
        }
      ],

      "/css/": [
        {
          collapsable: false,
          children: [
            "",
            { title: "基础", children: ["position", "bfc", "box"] },
            {
              title: "布局",
              children: ["flex", "holy_wing", "center", "rdad", "postcss_rem"]
            }
          ]
        }
      ],

      "/engineering/": [
        {
          collapsable: false,
          children: [
            "",
            {
              title: "基础/原理",
              children: ["module", "write_module", "minipack"]
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
                "nrm"
              ]
            }
          ]
        }
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
                "componentCom"
              ]
            },
            {
              title: "应用",
              children: ["devtools", "performance"]
            }
          ]
        }
      ],
      /* 框架 */

      /* 前端 */

      /* 算法 */
      "/leetcode/": [
        {
          collapsable: false,
          children: ["", "1", "2", "3", "4"]
        }
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
            "crossdomain"
          ]
        }
      ]
      /* 网络 */
    }
  },
  plugins: ["@vuepress/back-to-top", "@vuepress/nprogress"]
};
