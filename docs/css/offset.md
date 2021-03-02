# offset&client&scroll

## offset

![offset](/css_offset_1.png)

- 定位父级(`offsetParent`):与当前元素最近的绝对定位( `position` 不等于 `static` )的父级元素
- 偏移量
  - `offsetWidth = border-left + border-right + padding-left + padding-right + width`
  - `offsetHeight = border-top + border-bottom + padding-top + padding-bottom + height`
  - `offsetTop` 当前元素上外边框到 `offsetParent` 上内边框之间的距离
  - `offsetLeft` 当前元素左外边框到 `offsetParent` 左内边框之间的距离

## client

![client](/css_offset_2.png)

- `clientHeight = padding-top + height + padding-bottom - 水平滚动条高度（如果存在）`
- `clientWidth = padding-left + width + padding-right - 垂直滚动条宽度（如果存在）`
- `clientLeft = border-left`
- `clientTop = border-top`

::: warning 注

1. 所有 `client` 属性都是只读的
2. 如果设置 `display:none` 则所有 `client` 属性都为 0

:::

## scroll

- `scrollHeight` 表示元素的总高度，包括由于溢出而无法显示的部分
- `scrollWidth` 表示元素的总宽度，包括由于溢出而无法显示的部分
- `scrollTop` 是元素内容顶部到可见内容顶部的距离
- `scrollLeft` 是元素内容左部到可见内容左部的距离

如果滚动条划到底部 `scrollTop = height + padding + border + margin - 可见部分高度`
`scrollLeft` 同理

::: warning 注

1. 没有滚动条的时候 `scrollHeight=clientHeight scrollWidth=clientWidth`
2. `scrollHeight scrollWidth` 是只读属性
3. 如果元素不能滚动 `scrollTop scrollLeft` 都是为 0
4. `scrollTop scrollLeft` 如果设置小于零则会变为 0，大于元素内容最大值，那么会变为元素内容最大值

:::
