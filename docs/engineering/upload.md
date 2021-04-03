# 前端上传

前端上传文件的方法主要有两种：

- 纯 `form` 表单提交
- 利用 `web API formData` 封装文件数据，手动通过 `http` 请求发送

## 纯 `form` 提交

```html
<form
  method="post"
  enctype="multipart/form-data"
  action="http://xxx.xxx/upload"
>
  <div>
    <label for="file">Choose a file</label>
    <input type="file" id="file" name="myFile" />
  </div>
  <div>
    <!-- 不写 type 默认就是 submit -->
    <button>Send the file</button>
  </div>
</form>
```

重点：

- 文件是二进制数据，需要将 `enctype` 的值设置为 `multipart/form-data`
- 将 `method` 属性设置为 `POST`，因为文件内容不能放入 `URL` 参数中
- `action` 为后台接口，`input name` 为参数名

问题：

- 提交会刷新页面，无法接收后台返回(提交相当于修改 `url` 来发送请求)
  - 可以通过配置一个 `iframe name` 设置和 `form name` 一致来解决刷新问题

## `formData`

利用 `FormData` 封装文件数据，然后通过 `XMLHttpRequest` 发送：

```html
<input type="file" id="file" />
<button id="upload">上传</button>
<script>
  let btn = document.getElementById("upload");
  btn.addEventListener("click", function() {
    let file = document.getElementById("file");
    let formData = new FormData();
    formData.append("file", file.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    // 设置二进制类型 这里不需要设置 XMLHttpRequest 参数是 formData 的时候默认就是这个类型
    // 如果是 axios 封装设置了默认表单文本类型的 content-type: application/x-www-form-urlencoded 需要修改
    // xhr.setRequestHeader("content-type", "multipart/form-data");
    xhr.onload = function() {
      // 请求结束后,在此处写处理代码
    };
    xhr.send(formData);
  });
</script>
```

图片可以通过 `readAsDataURL` 转化 `base64` 然后当作字符串参数直接上传(不使用 `formData`)
