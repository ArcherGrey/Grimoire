/* 全局配置文件 */
module.exports = {
  base: "/Grimoire/", //部署站点的基础路径
  title: "Grimoire", // 标题
  description: "Magic Book",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: "auto",
    nav: [{ text: "编年史", link: "/annals/" }]
    // sidebar: ["/", "/page-a", ["/page-b", "Explicit link text"]]
  }
};
