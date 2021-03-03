# 统计页面标签

```js
// 实际上就是树的遍历
// body 标签是根节点
let root = document.querySelector("body");

let r1 = new Map();
let m1 = "",
  c1 = 0;

// 深度优先遍历
function dfs(root) {
  if (!root) return null;
  if (!r1.has(root.tagName)) {
    r1.set(root.tagName, 1);
  } else r1.set(root.tagName, r1.get(root.tagName) + 1);
  if (r1.get(root.tagName) > c1) {
    c1 = r1.get(root.tagName);
    m1 = root.tagName;
  }
  [...root.children].map(child => {
    dfs(child);
  });
}

dfs(root);

for (let n of r1) {
  console.log(`tag:${n[0]} count:${n[1]}`);
}
console.log(`出现最多的标签是 ${m1} 出现 ${c1} 次`);
```
