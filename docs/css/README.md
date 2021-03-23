# CSS

## 常见问题

### font

- chrome 支持最小字体 12px
- 设计图 设计字体小于 12px 实际浏览器最小显示 12px
  - 可以使用 `transform: scale(n)` 缩放
    - 问题：会把整个块都缩放，造成留白
  - 让设计师修改
- 原则
  - 尽量使用系统默认字体
  - 兼顾中西，西文在前 中文在后
  - 兼顾多操作系统
  - 兼顾旧操作系统 使用字体族系列 `serif` 和 `sans-serif` 结尾

### position

- fixed 一般情况下相对视窗是屏幕，当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

### calc

- 无效
  - height:calc(100vh-60); 无效
  - height:calc(100vh-60px); 无效
  - height:calc(100vh - 60px); 终于起效
  - 必须加单位 中间有空格

### padding margin

所有带四个属性的都是顺时针 上右下左

### div

- width 如果不指定会被内部撑开
- % 依赖父元素宽度
- `flex 1 1 auto` 自动延申的时候指定一个最大宽度 `calc(100% - xxx px)`
- 在设置 div 的透明度的时候发现设置了父 div 的透明度（opacity=0.5），子 div 的透明度也随着改变了，并且设置子 div 的透明度不起作用，这种情况下可以使用 rgba 来设置父 div 的透明度：例如设置 div 黑色半透明，可以设置 div 的 background:rgba(0,0,0,0.5)
- 梯形
  - 设置高度为 0
  - 设置底部边框 或者顶部边框 加上左右高度
    ```css
    height: 0;
    width: 100px;
    border-bottom: 100px solid #e5c3b2;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    ```

### pre

会保留空格和换行符

### img

- 等比例缩放 可以只指定 `width` 和 `height` 中的一个值，浏览器会根据原始图像进行缩放

```css
/* 占满 */
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

/* 固定宽高 */
img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}
```

- 响应式 `dpr` 高清屏可能大于 1
- 图片丢失

  - 图片加载失败利用 `onerror` 事件给图片添加一个新样式

  ```html
  <img src="test.png" alt="图片描述" onerror="this.classList.add('error');" />
  <style>
    img.error {
      position: relative;
      display: inline-block;
    }

    img.error::before {
      content: "";
      /** 定位代码 **/
      background: url(error-default.png);
    }

    img.error::after {
      content: attr(alt);
      /** 定位代码 **/
    }
  </style>
  ```

### 过长省略号显示

```css
/* 单行 */
.hidden {
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* 多行 */
.hidden {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

### 整体布局

- `wrapper` 最外层包裹

  - `left right`
  - `content`

- 定宽布局

```css
.wrapper {
  width: 1200px; /* 大于定宽两侧留白，小于则出现滚动条保证内容不乱 */
  margin: 0 auto; /* 水平居中 */
}
```

- 全屏布局 左右两栏左侧定宽 右侧自适应，外层包裹设置最小宽度

```html
<div class="wrapper">
  <div class="sider"></div>
  <div class="main"></div>
</div>

<style>
  .wrapper {
    display: flex;
    min-width: 1200px;
  }
  .sider {
    flex-basis: 250px;
    margin-right: 10px;
  }
  .main {
    flex-grow: 1;
  }
</style>
```

- 底部 `footer`：如果页面内容高度小于视窗，固定在视窗底部，如果大于视窗，按照正常流布局

```html
<div class="wrapper">
  <div class="main"></div>
  <div class="footer"></div>
</div>

<style>
  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .footer {
    margin-top: auto; /* 或者 在 wrapper 里面设置 justify-content: space-between */
    flex-shrink: 0;
    height: 30px;
    background: deeppink;
  }
</style>
```

### 滚动

- 滚动平滑：使用 `scroll-behavior: smooth` 让滚动丝滑
- 滚动位置：使用 `scroll-snap-type` 优化滚动效果，让滚动操作结束后，元素停止在适合的位置

## 资源列表

- 响应式
  - postcss_rem 打包将 `px` 转换 `rem`
- 切图工具
  - [pxcook](https://www.fancynode.com.cn/pxcook)
  - phototshop
  - pageruler chrome 插件 可以得到页面元素尺寸
  - [在线生成雪碧图](https://www.toptal.com/developers/css/sprite-generator)
- 网站
  - [codepen-前端各种特效，在线实时渲染](https://codepen.io/)
- 图标
  - [阿里巴巴矢量图标库](https://www.iconfont.cn/)
- css
  - [css 常用图形绘制](https://www.w3cplus.com/css/css-simple-shapes-cheat-sheet)
  - [css 规范](https://www.w3.org/Style/CSS/Overview.en.html#translations)
