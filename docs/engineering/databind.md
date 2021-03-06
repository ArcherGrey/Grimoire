# 双向绑定

双向绑定就是在单向绑定的基础上添加事件监听，常见的方法有：

- 基于发布订阅模式
- 基于脏检查
- 数据劫持

## 发布订阅模式

通过 `sub pub` 实现数据和视图的绑定监听，更新数据通过 `vm.set('property', value)`

## 脏检查

`angular.js` 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 `setInterval()` 定时轮询检测数据变动，`angular` 只有在指定的事件触发时进入脏值检测，大致如下：

- `DOM` 事件，譬如用户输入文本，点击按钮等。( `ng-click` )
- `XHR` 响应事件 ( `$http` )
- 浏览器 `Location` 变更事件 ( `$location` )
- `Timer` 事件( `timeout , timeout,interval` )
- 执行 `digest()` 或 `digest()` 或 `apply()`

## 数据劫持

思路：

1. 实现一个数据监听器 `Observer` 对对象的所有属性进行监听,属性发生变化得到最新值并通知订阅者
2. 实现解析器 `Compile` 解析模板中的 `Directive`(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
3. 实现 `Watcher` 作为 `Observer` 和 `Compile` 桥梁,接收到的 `Observer` 产生的数据变化,并根据 `Compile` 提供的指令进行视图渲染,使得数据变化促使视图变化

<img :src="$withBase('/js_databind_1.png')" alt="流程图">

### 实现 `Observer`

利用 `Obeject.defineProperty()` 来监听属性变化

::: details 点击查看代码

```js
function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  constructor: Observer,
  walk: function(data) {
    var me = this;
    Object.keys(data).forEach(function(key) {
      me.convert(key, data[key]);
    });
  },
  convert: function(key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function(data, key, val) {
    var dep = new Dep();
    var childObj = observe(val);

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  if (!value || typeof value !== "object") {
    return;
  }

  return new Observer(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },

  depend: function() {
    Dep.target.addDep(this);
  },

  removeSub: function(sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  },
};

Dep.target = null;
```

:::

### 实现 `Compile`

主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图，如图所示

<img :src="$withBase('/js_databind_2.png')" alt="compile">

::: details 点击查看代码

```js
function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  constructor: Compile,
  node2Fragment: function(el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function() {
    this.compileElement(this.$fragment);
  },

  compileElement: function(el) {
    var childNodes = el.childNodes,
      me = this;

    [].slice.call(childNodes).forEach(function(node) {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;

      if (me.isElementNode(node)) {
        me.compile(node);
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1.trim());
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function(node) {
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function(attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function(node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function(attr) {
    return attr.indexOf("v-") == 0;
  },

  isEventDirective: function(dir) {
    return dir.indexOf("on") === 0;
  },

  isElementNode: function(node) {
    return node.nodeType == 1;
  },

  isTextNode: function(node) {
    return node.nodeType == 3;
  },
};

// 指令处理集合
var compileUtil = {
  text: function(node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },

  html: function(node, vm, exp) {
    this.bind(node, vm, exp, "html");
  },

  model: function(node, vm, exp) {
    this.bind(node, vm, exp, "model");

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener("input", function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function(node, vm, exp) {
    this.bind(node, vm, exp, "class");
  },

  bind: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + "Updater"];

    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function(node, vm, exp, dir) {
    var eventType = dir.split(":")[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function(vm, exp) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function(k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function(vm, exp, value) {
    var val = vm;
    exp = exp.split(".");
    exp.forEach(function(k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  },
};

var updater = {
  textUpdater: function(node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },

  htmlUpdater: function(node, value) {
    node.innerHTML = typeof value == "undefined" ? "" : value;
  },

  classUpdater: function(node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, "").replace(/\s$/, "");

    var space = className && String(value) ? " " : "";

    node.className = className + space + value;
  },

  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
};
```

:::

### 实现 `Watcher`

主要做的事情是:

1. 在自身实例化时往属性订阅器(`dep`)里面添加自己
2. 自身必须有一个 `update()`方法
3. 待属性变动 `dep.notice()`通知时，能调用自身的 `update()`方法，并触发 `Compile` 中绑定的回调，则功成身退。

::: details 点击查看代码

```js
function Watcher(vm, expOrFn, cb) {
  this.cb = cb;
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.depIds = {};

  if (typeof expOrFn === "function") {
    this.getter = expOrFn;
  } else {
    this.getter = this.parseGetter(expOrFn.trim());
  }

  this.value = this.get();
}

Watcher.prototype = {
  constructor: Watcher,
  update: function() {
    this.run();
  },
  run: function() {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function(dep) {
    // 1. 每次调用run()的时候会触发相应属性的getter
    // getter里面会触发dep.depend()，继而触发这里的addDep
    // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
    // 则不需要将当前watcher添加到该属性的dep里
    // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
    // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
    // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
    // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
    // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
    // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
    // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
    // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
    // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
    // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  },
  get: function() {
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  },

  parseGetter: function(exp) {
    if (/[^\w.$]/.test(exp)) return;

    var exps = exp.split(".");

    return function(obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    };
  },
};
```

:::

### 极简实现

```js
// 极简第一种
const obj = {};
Object.defineProperty(obj, "text", {
  get: function() {
    console.log("get val");
  },
  set: function(newVal) {
    console.log("set val:" + newVal);
    document.getElementById("input").value = newVal;
    document.getElementById("span").innerHTML = newVal;
  },
});

const input = document.getElementById("input");
input.addEventListener("keyup", function(e) {
  obj.text = e.target.value;
});

// -----------------

// 极简第二种
const input = document.getElementById("input");
const p = document.getElementById("p");
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === "text") {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener("keyup", function(e) {
  newObj.text = e.target.value;
});
```
