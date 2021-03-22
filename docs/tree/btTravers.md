# 二叉树遍历

## 广度优先遍历

### 层次遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 层次遍历 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  let queue = [root]; // 队列
  let res = []; // 保存每层结果
  while (queue.length) {
    let levelSize = queue.length; // 当前层的长度
    res.push([]);
    for (let i = 0; i < levelSize; ++i) {
      let node = queue.shift(); // 出队
      // 把当前层的每个节点的左右子节点入队
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      res[res.length - 1].push(node.val);
    }
  }
  return res;
};
```
