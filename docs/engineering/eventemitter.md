# EventEmitter 封装

> 基于 `nodejs` 的 `Event` 模块中的 `eventemitter` 封装

> 发布订阅模式的事件总线

原型+构造函数：

```js
("use strict"); // 使用模块方式引入会自动使用严格模式

var has = Object.prototype.hasOwnProperty,
  prefix = "~";

/**
 * `Event` 构造函数.
 * `Events` 对象的属性是 `Event` 的名称.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// 1. 为了避免可能对 `Object` 原型方法的覆盖, 不继承 `Object.prototype`.
// 2. 在某些引擎这样创建实例比直接调用 `Object.create(null)` 更快.
// 3. 如果不支持 `Object.create(null)`
// 那么我们对 `event name` 添加一个字符的前缀避免覆盖 `object` 上的属性.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // `__proto__` 在一些旧的浏览器依旧支持
  // 例如 Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * event listener 构造函数.
 *
 * @param {Function} fn 回调函数.
 * @param {*} context 触发事件的上下文环境.
 * @param {Boolean} [once=false] 是否只执行一次.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * 添加事件监听.
 *
 * @param {EventEmitter} emitter `EventEmitter` 实例的引用.
 * @param {(String|Symbol)} event 事件名称.
 * @param {Function} fn 回调函数.
 * @param {*} context 触发事件的上下文环境.
 * @param {Boolean} once 是否只执行一次.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== "function") {
    throw new TypeError("The listener must be a function");
  }

  var listener = new EE(fn, context || emitter, once),
    evt = prefix ? prefix + event : event;

  if (!emitter._events[evt])
    (emitter._events[evt] = listener), emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * 根据事件名称清除事件监听.
 *
 * @param {EventEmitter} emitter `EventEmitter` 实例的引用.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * `EventEmitter` 构造函数.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * 返回所有的已经注册的事件
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
    events,
    name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * 返回对应事件上的所有回调函数.
 *
 * @param {(String|Symbol)} event 事件名.
 * @returns {Array} 注册的回调函数.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
    handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * 触发事件.
 *
 * @param {(String|Symbol)} event 事件名.
 * @returns {Boolean} 如果有对应的回调函数返回 `true`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt],
    args = Array.prototype.slice(arguments, 1);

  if (listeners.fn) {
    if (listeners.once)
      this.removeListener(event, listeners.fn, undefined, true);

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length;

    for (i = 0; i < length; i++) {
      if (listeners[i].once)
        this.removeListener(event, listeners[i].fn, undefined, true);

      listeners[i].fn.apply(listeners[i].context, args);
    }
  }

  return true;
};

/**
 * 给事件添加监听器.
 *
 * @param {(String|Symbol)} event 事件名.
 * @param {Function} fn 回调函数.
 * @param {*} [context=this] 触发事件的上下文环境.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * 添加一次性监听.
 *
 * @param {(String|Symbol)} event 事件名.
 * @param {Function} fn 回调函数.
 * @param {*} [context=this] 触发事件的上下文环境.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * 移除事件监听.
 *
 * @param {(String|Symbol)} event 事件名.
 * @param {Function} fn 需要移除的回调函数.
 * @param {*} context 回调函数对应的上下文.
 * @param {Boolean} once 是否只移除一次性监听.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(
  event,
  fn,
  context,
  once
) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // 如果没有回调函数, 重置数组.
    //
    if (events.length)
      this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * 移除所有回调, 或者指定事件的所有回调.
 *
 * @param {(String|Symbol)} [event] 事件名.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// 根据使用习惯添加别名.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// 前缀设置.
//
EventEmitter.prefixed = prefix;

//
// 允许 `EventEmitter` 作为 module 命名空间引入.
//
EventEmitter.EventEmitter = EventEmitter;

//
// 导出模块.
//
if ("undefined" !== typeof module) {
  module.exports = EventEmitter;
}
```
