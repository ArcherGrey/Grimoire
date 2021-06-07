# 受控组件和非受控组件

## 非受控组件

非受控 `input` 类似传统的表单 `input`:

```js
class Form extends Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}
```

它记录下你的输入，然后你可以通过 `ref` 来获取记录的输入，例如：

```js
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  };

  render() {
    return (
      <div>
        <input type="text" ref={input => (this._name = input)} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```

换句话说，就是你必须从对应的区域获取你的输入。

## 受控组件

一个受控的 `input` 把它当前的值作为一个 `prop`，通过回调函数来修改这个值，这样更类似于 `react` 的方式。

所有的输入都保存在 `state` 里：

```js
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

这种模式相当于要把每个区域的值的变化都统一推送到表单组件上，所以表单组件总能够获取每个输入的当前值，而不需要找到具体是哪个输入变化了。

这意味着你的数据 `state` 和 视图 `inputs` 总是同步的，`state` 控制 `input` 显示，`input` 修改触发 `state` 更新，这样输入变化都会立即响应：

- 输入校验立刻反馈
- 提交按钮除非所有字段都校验成功，否则禁用
- 强制输入特定格式

## 如何变成受控组件

只需要把表单元素的值通过 `prop` 来设置，常见表单元素如下：

|            元素             |           值           |    回调    |      回调里面的值      |
| :-------------------------: | :--------------------: | :--------: | :--------------------: |
|   `<input type="text" />`   |    `value="string"`    | `onChange` |  `event.target.value`  |
| `<input type="checkbox" />` |  `checked={boolean}`   | `onChange` | `event.target.checked` |
|  `<input type="radio" />`   |  `checked={boolean}"`  | `onChange` | `event.target.checked` |
|       `<textarea />`        |    `value="string"`    | `onChange` |  `event.target.value`  |
|        `<select />`         | `value="option value"` | `onChange` |  `event.target.value`  |

## 总结

|       特性       | 受控 | 非受控 |
| :--------------: | :--: | :----: |
|     提交校验     |  √   |   √    |
|     实时校验     |  √   |   ×    |
| 提交按钮条件禁用 |  √   |   ×    |
|   强制输入格式   |  √   |   ×    |
|     多端输入     |  √   |   ×    |
|     动态输入     |  √   |   ×    |
