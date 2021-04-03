# JavaScript

## 参考

- [面试参考](https://juejin.im/post/5d8989296fb9a06b1f147070#heading-10)
- [面试参考](https://juejin.im/post/5d87985d6fb9a06add4e6ac3#heading-13)

## 常见问题

- String
  - 去除空格
    - `str.replace(/\s/g, '')`
    - `str.split(' ').join('')`
- Array
  - 初始化数组并赋值
    - `[...Array(100)].map(_=>0)`
      - Array(100) 返回的是一个指向 100 个元素数组的指针，所以这里要解构
    - `Array(100).fill(0)`
  - 判断数组中是否存在元素 可以使用 `includes` (类数组对象也可以使用)
- Object
  - Object.assign() 只能拷贝枚举对象（最外层属性） 所以是浅拷贝
  - JSON.parse(JSON.stringify(obj1)); 对于没有函数的 深拷贝
- base64
  - 加密 `btoa`
  - 解密 `atob`
- for
  - for in
    - 用于调试
    - 不应该用于迭代一个关注索引顺序的 Array
    - 先遍历出整数属性（integer properties，按照升序），然后其他属性按照创建时候的顺序遍历出来
