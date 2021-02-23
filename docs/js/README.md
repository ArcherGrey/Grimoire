# JavaScript

## 参考

- [面试参考](https://juejin.im/post/5d8989296fb9a06b1f147070#heading-10)
- [面试参考](https://juejin.im/post/5d87985d6fb9a06add4e6ac3#heading-13)

## 常见问题

- Array
  - 初始化数组并赋值
    - `[...Array(100)].map(_=>0)`
      - Array(100) 返回的是一个指向 100 个元素数组的指针，所以这里要解构
    - `Array(100).fill(0)`
- Object
  - Object.assign() 只能拷贝枚举对象（最外层属性） 所以是浅拷贝
  - JSON.parse(JSON.stringify(obj1)); 对于没有函数的 深拷贝

## 手写代码

- [call apply bind](/js/cab.html)
- [防抖&节流](/js/debounce.html)
- [浅拷贝&深拷贝](/js/copy.html)
- [观察者&发布订阅](/js/observer.html)
- [继承](/js/class.html)
- [promise](/js/promise.html)
- [instanceof](/js/typeof.html)
- [数据绑定](/js/databind.html)
