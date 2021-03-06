# vue 性能优化

## 原理

### 图片懒加载

思路：

1. 先不设置 `src` 将图片的地址存储在 `data-src`
2. 绑定 `scroll` 事件，判断图片是否在可视区域 这样性能较差兼容性较好，可以使用 `IntersectionObserver` 监测，不兼容 `IE`
3. 如果进入可视区域，根据 `data-src` 修改 `src`

实现：

```js
const LazyLoad = {
  // install方法
  install(Vue, options) {
    const defaultSrc = options.default;
    Vue.directive("lazy", {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc);
      },
      inserted(el) {
        if (IntersectionObserver) {
          LazyLoad.observe(el);
        } else {
          LazyLoad.listenerScroll(el);
        }
      }
    });
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute("data-src", val);
    el.setAttribute("src", def);
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver(entries => {
      const realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc;
          el.removeAttribute("data-src");
        }
      }
    });
    io.observe(el);
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300);
    LazyLoad.load(el);
    window.addEventListener("scroll", () => {
      handler(el);
    });
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight;
    const elTop = el.getBoundingClientRect().top;
    const elBtm = el.getBoundingClientRect().bottom;
    const realSrc = el.dataset.src;
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute("data-src");
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer;
    let prevTime;
    return function(...args) {
      const currTime = Date.now();
      const context = this;
      if (!prevTime) prevTime = currTime;
      clearTimeout(timer);

      if (currTime - prevTime > delay) {
        prevTime = currTime;
        fn.apply(context, args);
        clearTimeout(timer);
        return;
      }

      timer = setTimeout(function() {
        prevTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  }
};

export default LazyLoad;
```

## vue

### 长列表性能优化

`vue` 会通过 `Object.defineProperty` 来对数据进行劫持，来实现视图响应数据变化，但是有些时候只是展示数据，数据不会变化，这个时候就不需要劫持数据，在大量数据展示的情况下，能够明显减少组件初始化时间：

```js
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    // 这里使用 Object.freeze 来冻结对象
    this.users = Object.freeze(users);
  }
};
```

### 事件销毁

如果时使用 `addEventListene` 等方式绑定的事件时不会自动销毁的，需要在组件销毁时手动移除事件监听，避免造成内存泄漏：

```js
created() {
  addEventListener('click', this.click, false)
},
beforeDestroy() {
  removeEventListener('click', this.click, false)
}
```

### 图片懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 `Vue` 的 `vue-lazyload` 插件：

- 安装： `npm install vue-lazyload --save-dev`
- 入门文件 `main.js` 引入并使用：

```js
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
```

- 在 `img` 标签 `src` 属性直接改为 `v-lazy`:

```js
<img v-lazy="/static/img/1.png">
```

### 第三方插件按需引入

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 `babel-plugin-component` ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 `element-ui` 组件库为例：

- 安装 `babel-plugin-component`：`npm install babel-plugin-component -D`
- 修改 `.babelrc`:

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

- 入口文件 `main.js` 按需引入：

```js
import { Button, Select } from "element-ui";

Vue.use(Button);
Vue.use(Select);
```

### 优化无线列表

需要显示非常长的列表或者无限滚动的列表，可以采用窗口化技术，只渲染部分内容，可以参考：

- `vue-virtual-scroll-list`
- `vue-virtual-scroller`

### 函数式组件

无状态组件可以使用函数式组件，减少 `js` 执行时间

## vue-router

### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```js
const Foo = () => import("./Foo.vue");
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }]
});
```
