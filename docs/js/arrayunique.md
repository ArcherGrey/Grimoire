# 数组去重

## 双循环

```js
var array = [1, 1, "1", "1"];

function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i]);
    }
  }
  return res;
}

console.log(unique(array)); // [1, "1"]
```

## indexOf

```js
var array = [1, 1, "1"];

function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}

console.log(unique(array));
```

## 排序后去重

```js
var array = [1, 1, "1"];

function unique(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

console.log(unique(array));
```

## filter

```js
// indexOf
var array = [1, 2, 1, 1, "1"];

function unique(array) {
  var res = array.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

console.log(unique(array));

// 排序
var array = [1, 2, 1, 1, "1"];

function unique(array) {
  return array
    .concat()
    .sort()
    .filter(function(item, index, array) {
      return !index || item !== array[index - 1];
    });
}

console.log(unique(array));
```

## Object 键值对

```js
var array = [{ value: 1 }, { value: 1 }, { value: 2 }];

function unique(array) {
  var obj = {};
  return array.filter(function(item, index, array) {
    console.log(typeof item + JSON.stringify(item));
    return obj.hasOwnProperty(typeof item + JSON.stringify(item))
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true);
  });
}

console.log(unique(array)); // [{value: 1}, {value: 2}]
```

## es6

```js
// set
function unique(array) {
  return [...new Set(array)];
}

// map
function unique(arr) {
  const seen = new Map();
  return arr.filter(a => !seen.has(a) && seen.set(a, 1));
}
```
