# MVX 模型

## MVC

- 视图 `view`：展示数据，一般没有业务逻辑，有时为了实现刷新功能，需要在监视的数据模型上注册监视器
- 控制器 `Controller`：处理事件并做出响应
  - 用户行为
  - 数据模型变化
- 模型 `Model`：封装和应用程序的业务逻辑相关的数据和数据的处理方法
  - 可以直接访问数据，例如对数据库的访问
  - 不依赖 `View Controller`

各部分的通信方式：

<img :src="$withBase('/eng_mvx_1.png')" alt="mvc">

基于 `MVC` 理念的简易实现：

```js
/** 模拟 Model, View, Controller */
var M = {},
  V = {},
  C = {};

/** Model 负责存放资料 */
M.data = "hello world";

/** View 负责将资料输出给用户 */
V.render = (M) => {
  alert(M.data);
};

/** Controller 作为连接 M 和 V 的桥梁 */
C.handleOnload = () => {
  V.render(M);
};

/** 在网页读取的时候呼叫 Controller */
window.onload = C.handleOnload;
```

业界实现：

- `MFC`
- `Java`
  - `J2EE`
  - `Swing`
- `.NET`
  - `ASP.NET`
  - `ASP.NET MVC`
  - `Windows Forms`
- `Python`
  - `Django`
  - `TurboGears`
- `JavaScript`
  - `Backbone.js`
  - `Angular.js`
  - `Ember.js`

## MVVM

<img :src="$withBase('/eng_mvx_2.png')" alt="mvvm">

- 模型 `Model`：数据访问层
- 视图 `View`：用户界面
- 视图模型 `ViewModel`：通过数据绑定来实现视图和模型之间通信

## 区别

用 `ViewModel` 替代了 `Controller` 利用数据双向绑定减少了更新状态的逻辑复杂度
