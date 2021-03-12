# leetcode

## 尾递归

> 尾递归就是把变化的参数传递给递归函数变量。

例如，斐波拉其数列：

```js
// 普通递归
var fib = function(N) {
  if (N < 2) return N;
  return fib(N - 1) + fib(N - 2);
};

// 尾递归优化
var fib = function(N, a = 0, b = 1) {
  return N === 0 ? a : fib(N - 1, b, a + b);
};
```
