#!/bin/bash

branch=${1:-'master'}
message=${2:-'前端打包升级'}
sourcepath=${3:-'miui-sys-front-for-build'}
originPath=$(pwd)
dir=`dirname $0`
echo "当前目标分支 : $branch"

echo '开始upload---------'

cd ~/workspace/miui-sys-core/src/main/webapp/
git checkout $branch
git pull
rm -rf mqsas/*
cp -R "$originPath/release/$sourcepath/dist"/* ./mqsas
git add .
git commit -sm  "$sourcepath部署:$2

N/A

"
echo 'git commit end'

echo 'start git push'
cd ~/workspace/miui-sys-core/src/main/webapp/
git pull --rebase origin $branch
git push origin $branch:refs/for/$branch
echo 'successed'

# 打开git 页面
google-chrome #/dashboard/self
