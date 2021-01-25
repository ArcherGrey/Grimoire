#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git config --global user.email "498792539@qq.com"
git config --global user.name "ArcherGrey"
git config --global remote.origin.url "https://github.com/ArcherGrey/Grimoire.git"
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

echo $GITHUB_TOKEN

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://ArcherGrey:gr47725812@github.com/ArcherGrey/Grimoire.git master:gh-pages

cd -