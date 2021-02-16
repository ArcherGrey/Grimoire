# 链表

[[toc]]

## 定义

```js
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
```

## 反转链表

```js
// 递归
var reverseList = function(head) {
  // 终止条件 节点为空或者是单个节点不需要反转
  if (!head || !head.next) return head;
  let p = reverseList(head.next);
  // 两个节点反转
  head.next.next = head;
  head.next = null;
  return p;
};

// 迭代
var reverseList = function(head) {
  let cur = head; // 当前节点是head
  let pre = null;

  // 当前节点存在的时候循环
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
```
