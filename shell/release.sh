#!/bin/bash

branch=${1:-'master'}
message=${2:-'前端打包升级'}
sourcepath=${3:-'miui-sys-front-for-build'}
originPath=$(pwd)
dir=`dirname $0`
