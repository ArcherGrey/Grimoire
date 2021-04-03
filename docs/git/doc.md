# git 基本概念和使用

## 分区

- 工作区 `Working Directory`: 直接编辑的区域
- 暂存区 `stage or index`: 数据暂时存放的区域，数据进入本地代码仓库之前存放的区域(存放在 `.git/index` 中)
- 版本库，也叫本地仓库 `commit History`

### 分区转换指令

- `git add` 工作区 -> 暂存区
- `git commit` 暂存区 -> 版本库
- `git push` 版本库 -> 远程仓库

<img :src="$withBase('/git_doc_1.png')" alt="分区转换">

### 分区对比指令

- `git diff` 工作区 -> 暂存区
- `git diff head` 工作区 -> 版本库
- `git diff --cached` 暂存区 -> 版本库

<img :src="$withBase('/git_doc_2.png')" alt="分区对比">

## 原理

`git init` 初始化会创建 `.git` 目录：

```auto
└── .git
    ├── HEAD
    ├── config
    ├── description
    ├── hooks
    │   ├── applypatch-msg.sample
    │   ├── commit-msg.sample
    │   ├── fsmonitor-watchman.sample
    │   ├── post-update.sample
    │   ├── pre-applypatch.sample
    │   ├── pre-commit.sample
    │   ├── pre-push.sample
    │   ├── pre-rebase.sample
    │   ├── pre-receive.sample
    │   ├── prepare-commit-msg.sample
    │   └── update.sample
    ├── info
    │   └── exclude
    ├── objects
    │   ├── info
    │   └── pack
    └── refs
        ├── heads
        └── tags
```

其中 `objects` 目录是存储文件变化的核心，里面存放的文件名是根据 `SHA1` 计算得到，文件内容就是压缩后的二进制文件

`Object` 有三种类型：

- `Blob`: 文件
- `Tree`: 文件夹
- `Commit`: 提交节点

<img :src="$withBase('/git_doc_3.png')" alt="映射关系">

## 分支

```auto
.git
├── ......
├── HEAD
└── refs
    ├── heads
    │   └── master
    ├── remotes
    │   └── origin
    │       └── HEAD
    └── tags
```

- `heads` 记录本地所有分支
- `remote` 记录远程分支

分支当前指针指向最近一次 `commit`

::: warning 注

未被 `commit` 的文件（未放入版本库）切换分支时会被抛弃

:::

### 合并分支

- `merge`: 解决冲突后会创建一个新的 `commit` ，保留之前的 `commit` 记录
- `rebase`: 修改 `branch out` 位置，之前在最近节点合并之前 `commit`

## 版本回滚

- `revert` 回退上一个 `commit`
- `reset` 回退到指定 `commit`

## 代码暂存

当我们在当前分支工作时，不得已需要切换到其他分支处理事情而不想 `commit` 时，可以使用 `git stash` 将那些数据都暂存到 `Git` 提供的栈中
