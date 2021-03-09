# React

## 常见问题

### 图片批量导入

```js
items.map(i => {
  i.icon = require(`../../../../assets/images/point-${i.icon}.png`).default;
  return i;
});
```
