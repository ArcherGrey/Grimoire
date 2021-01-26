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
          { text: "框架", items: [{ text: "Vue", link: "/vue/" }] },
          { text: "算法", items: [{ text: "leetcode", link: "/leetcode/" }] }
        ]
      }
    ],
    sidebarDepth: 3,
    sidebar: {
      "/vue/": [
        {
          title: "Vue",
          collapsable: false,
          children: [{ title: "基础", children: ["reactivity"] }]
          // children: ["reactivity"]
        }
      ],
      "/js/": [
        {
          title: "JavaScript",
          collapsable: false,
          children: [{ title: "应用", children: ["databind"] }]
          // children: ["reactivity"]
        }
      ],
      "/leetcode/": [
        {
          // title: "sua",
          collapsable: false,
          children: ["", "1", "2", "3", "4"]
        }
      ]
    }
  },
  plugins: ["@vuepress/back-to-top", "@vuepress/nprogress"]
};
