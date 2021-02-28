# Git

[简明教程](https://marklodato.github.io/visual-git-guide/index-zh-cn.html)

## 工具

- Husky 拦截错误的 commit
- CommitLint 检查 commit 是否符合规范

## 常见问题

### 无法登录的问题

一般是 `DNS` 无法解析造成，解决办法：

1. 找到 `C:\Windows\System32\drivers\etc`
2. 管理员权限修改 `hosts`
3. 添加

```shell
#github
192.30.253.112 github.com
151.101.113.194 github.global.ssl.fastly.net
```

如果是 `mac`:

- `sudo vim /ect/hosts` 打开对应文件进行相同到编辑

### github 本地文件映射仓库

1. 初始化 `git init`
2. 关联远程仓库：

```auto
$ git remote add origin <远程仓库 http/ssh>
```

3. 修改本地仓库配置：

```bash
 git config --local -e
```

主要是用户名邮箱之类的

4. 设置本地分支和远程映射

这时候可能显示本地没有分支

需要 `git commit` 后才有

然后执行

```auto
git push --set-upstream <远程分支> <本地分支>
```

### 无法检测文件名大小写变化

原因： 默认配置忽略文件名大小写
解决： 在当前项目下运行 `git config core.ignorecase false` 关闭忽略大小写配置

### 报错 443

原因： dns 异常

解决：

- 清理 host 文件 `C:\Windows\System32\drivers\etc
  - hosts 文件看不到 gitbash 可以看到
- 第一步：查询如下两个域名，并分别记录下其对应的 ip：
  1、github.com
  2、github.global.ssl.fastly.net `
- 第二步：更新 host 文件：
  192.30.253.112 github.com
  151.101.185.194 github.global.ssl.fastly.net
- 第三步：清理下 DNS，再试一下。
  ipconfig /flushdns

### git push 提示输入密码

原因： 使用 `http` 方式 `clone` 代码

解决：

1. 查看当前方式：`git remote -v` 结果显示为 `http` 方式

```shell
> origin  https://github.com/ArcherGrey/UnlimitedDocsWork.git (fetch)
> origin  https://github.com/ArcherGrey/UnlimitedDocsWork.git (push)
```

2. 先移除旧的：

```bash
git remote rm origin
```

3. 添加新的 `SSH` 方式：

```bash
git remote add origin git@github.com:ArcherGrey/UnlimitedDocsWork.git
```

4. 设置本地分支和远程映射：

```bash
git branch --set-upstream-to=origin/<branch> master
```

## 资源列表

- [国内镜像](https://github.com/waylau/git-for-win)
- [Git 的奇技淫巧](https://github.com/521xueweihan/git-tips)
- [图解 git](https://marklodato.github.io/visual-git-guide/index-zh-cn.html)
- [git 在线可视化练习](https://learngitbranching.js.org/)
- github
  - shields.io ：说明文档中各种小图标 [网址](https://shields.io/)
  - [github emoji](https://github.com/caiyongji/emoji-list)
