const simpleGit = require('simple-git')
const fs = require('fs')
var shell = require('shelljs');
const path = require('path')
const basePath = path.join(__dirname, '../../release');

if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
}

module.exports = function (name, git) {
    const commend1 = `cd ${basePath} && rm -rf ${name} && git clone ${git} ${name} && cd ${name} && npm install`
    const commend = `cd ${basePath} && rm -rf ${name} && git clone ${git} ${name} && cd ${name} && sh shell/unzip.sh`
    let code1 = shell.exec(commend1).code;

    console.log(code1,'code1');
    if(code1 === 0) {
        return code1
    }else {
        return shell.exec(commend).code
    }
}
