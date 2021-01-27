/* 全局配置文件 */
module.exports = {
  base: "/Grimoire/", //部署站点的基础路径
  title: "Grimoire", // 标题
  description: "Magic Book",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // sidebar: "auto",
    nav: [
      { text: "编年史", link: "/annals/" },
      {
        text: "前端",
        items: [
          { text: "JavaScript", link: "/js/" },
          { text: "Css", link: "/css/" },
          { text: "框架", items: [{ text: "Vue", link: "/vue/" }] }
        ]
      },
      { text: "网络", link: "/network/" },
      { text: "算法", items: [{ text: "leetcode", link: "/leetcode/" }] }
    ],
    sidebarDepth: 3,
    sidebar: {
      /* 前端 */
      "/js/": [
        {
          title: "JavaScript",
          collapsable: false,
          children: [{ title: "应用", children: ["databind"] }]
          // children: ["reactivity"]
        }
      ],

      "/css/": [
        {
          title: "Css",
          collapsable: false,
          children: [
            { title: "基础", children: ["position", "bfc", "box"] },
            { title: "布局", children: ["flex", "holy_wing"] }
          ]
          // children: ["reactivity"]
        }
      ],

      /* 框架 */
      "/vue/": [
        {
          title: "Vue",
          collapsable: false,
          children: [{ title: "基础", children: ["reactivity"] }]
          // children: ["reactivity"]
        }
      ],
      /* 框架 */

      /* 前端 */

      /* 算法 */
      "/leetcode/": [
        {
          // title: "sua",
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
          children: ["http", "socket"]
        }
      ]
      /* 网络 */
    }
  },
  plugins: ["@vuepress/back-to-top", "@vuepress/nprogress"]
};
