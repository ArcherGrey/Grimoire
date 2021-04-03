# 前端编码

## `escape` ~~已废弃~~

生成新的由十六进制转义序列替换的字符串

```js
escape("abc123"); // "abc123"
escape("äöü"); // "%E4%F6%FC"
escape("ć"); // "%u0107"

// special characters
escape("@*_+-./"); // "@*_+-./"

// 解码
unescape();
```

使用 `encodeURI` 或 `encodeURIComponent` 代替.

## `encodeURI`

通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (`URI`) 进行编码 (该字符的 `UTF-8` 编码仅为四转义序列)由两个 "代理" 字符组成)。

下面的字符不会编码

- 保留字符：`; , / ? : @ & = + $`
- 非转义字符：`字母 数字 - _ . ! ~ * ' ( )`
- 数字符号：`#`

无法产生能适用于 `HTTP GET` 或 `POST` 请求的 `URI` (因为 "&", "+", 和 "=" 不会被编码)
使用 `encodeURIComponent` 可以编码

```js
encodeURI("测试 123 asd ?#"); // "%E6%B5%8B%E8%AF%95%20123%20asd%20?#"
// 解码
decodeURI("%E6%B5%8B%E8%AF%95%20123%20asd%20?#");
```

## `encodeURIComponent`

`encodeURI` 加强版，除了非转义字符其他的都会编码
