# 前缀树（字典树）

::: tip 简介
一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。
:::

## 性质

- 根节点不包含字符，除根节点外每一个节点都只包含一个字符
- 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串
- 每个节点的所有子节点包含的字符都不相同

## 实现

```js
/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.isEnd = false;
  this.next = new Array(26);
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let node = this;
  for (let w of word) {
    let index = w.charCodeAt() - "a".charCodeAt();
    if (!node.next[index]) {
      node.next[index] = new Trie();
    }
    node = node.next[index];
  }
  node.isEnd = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let node = this;
  for (let w of word) {
    let index = w.charCodeAt() - "a".charCodeAt();
    node = node.next[index];
    if (!node) return false;
  }
  return node.isEnd;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let node = this;
  for (let w of prefix) {
    let index = w.charCodeAt() - "a".charCodeAt();
    node = node.next[index];
    if (!node) return false;
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```
