# 路由懒加载

当打包构建应用时，`JavaScript` 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

写法：

```js
// 动态 import
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");

// require
const Foo = resolve => require(["@/pages/task"], resolve);
```

如果每个页面有公用的代码就会多次打包

`webpack 4` 以后使用 `SplitChunksPlugin` 插件配置 `optimization.splitChunks`:

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async", // 对哪些 chunk 进行优化
      minChunks: 2, // 拆分前必须共享模块的最小 chunks 数
      cacheGroups: {
        // 需要拆分的内容
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配的文件 省略则匹配所有
          name: "xxx" // 生成文件的名称
        }
      }
    }
  }
};
```
