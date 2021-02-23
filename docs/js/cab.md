# call apply bind

## call

`call` 也就是 `Function.prototype.call()` ，是函数类型特有的原型方法，可以传入一个指定的`this`和其他参数：

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5).name);
// expected output: "cheese"
```

函数中`this`所指始终是调用函数的对象，如果不使用`call`：

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product(name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5).name);
// expected output: "undefined"
```

`Food` 函数中调用`Product`函数，`Product`函数中的`this`就会指向`window`而不是调用`Food` 的对象，所以通过它生成的实例中也就是没有相应的属性。

可以看到通过调用`call`，改变了函数中`this`的指向。

## apply

`apply` 和 `call` 非常相似，不同之处在于提供参数的方式，`apply`使用参数数组而不是一组参数列表。

## bind

`bind` 函数会创建一个新函数（绑定函数），新函数和被调函数（绑定函数的目标函数）具有相同的函数体。当新函数被调用时`this` 绑定到`bind` 的第一个参数：

```js
this.x = 9;
var module = {
  x: 81,
  getX: function() {
    return this.x;
  }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

`bind` 一个最简单的用法是使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 bind()的第二个参数跟在 this（或其他对象）后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面：

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或全局）对象。当使用类的方法时，需要 this 引用类的实例，你可能需要显式地把 this 绑定到回调函数以便继续使用实例：

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log("I am a beautiful flower with " + this.petalCount + " petals!");
};

var flower = new LateBloomer();
flower.bloom(); // 一秒钟后, 调用'declare'方法
```

## 代码实现

```js
// bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    if (typeof this !== "function") {
      throw new TypeError(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }

    // 第一个参数是 context 获取第二个及以后的参数
    var args = Array.prototype.slice.call(arguments, 1),
      self = this,
      fNOP = function() {},
      fBound = function() {
        // this instanceof fBound === true时,说明被当做构造函数调用
        return self.apply(
          this instanceof fBound ? this : context,
          // 绑定完成后还可以继续补充参数
          args.concat(Array.prototype.slice.call(arguments))
        );
      };

    // 通过添加中间函数 fNOP 利用原型链继承
    // 使得修改 fBound.prototype 不会影响绑定函数原型
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// call
Function.prototype.call = function(ctx) {
  // 非严格模式下
  // 如果第一个参数为null或者undefined，则指向全局对象
  // ---
  // 严格模式下
  // 如果是null则this为null，如果是undefined则this为undefined
  let context = ctx || window;
  context.fn = this; // 待执行函数

  // 参数是类数组对象没有slice方法
  // 需要先转换成数组

  let args = [];
  for (let i = 1; i < arguments.length; ++i) {
    args.push(arguments[i]);
  }

  // es6
  // let args = [...arguments].slice(1);
  context.fn(...args);
  delete context.fn;
};

// apply

Function.prototype.apply = function(ctx) {
  // 非严格模式下
  // 如果第一个参数为null或者undefined，则指向全局对象
  // ---
  // 严格模式下
  // 如果是null则this为null，如果是undefined则this为undefined
  let context = ctx || window;
  context.fn = this; // 待执行函数

  let args = [...arguments][1];
  if (args) return context.fn(...args);
  else return context.fn();
  delete context.fn;
};
```
