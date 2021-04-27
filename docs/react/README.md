# React

## 资源

- [react hook](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

## 常见问题

### 图片批量导入

```js
items.map((i) => {
  i.icon = require(`../../../../assets/images/point-${i.icon}.png`).default;
  return i;
});
```

### 错误信息列表

- `A cross-origin error was thrown.`
  - 指向 `ReactDOM.render`
    - 大概率是页面中有的 `JSON.parse(undefined)` 转换报错 调试查看
- `Cannot update during an existing state transition`
  - `react hook` 方式 路由跳转直接在函数内导致，要放到 `useEffect` 里面，因为函数内部属于 `render` 过程如果修改路由可能会导致不可控，只能在加载完成后跳转
- `Can't perform a React state update on an unmounted component`
  - `react class` 方式 在构造函数内 路由跳转导致，放到 `componentDidMount` 加载完成后执行（同上面）

### key

- map 生成序列常会用到
- 最好是数据的 id
- 不需要全局唯一，同级唯一即可

## 面试

### `hook`

解决了 `class` 的问题：

- 组件之间重用有状态逻辑很困难
  - 自定义 `hook`
- 复杂的组件难以理解，有状态逻辑复杂难以拆分
  - 拆分为较小的函数
- `class this` 上下文环境容易混淆
  - 不使用 `class`
