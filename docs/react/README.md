# React

## 常见问题

### 图片批量导入

```js
items.map(i => {
  i.icon = require(`../../../../assets/images/point-${i.icon}.png`).default;
  return i;
});
```

### key

- map 生成序列常会用到
- 最好是数据的 id
- 不需要全局唯一，同级唯一即可
