const simpleGit = require('simple-git')
const fs = require('fs')
var shell = require('shelljs');
const path = require('path')
const basePath = path.join(__dirname, '../../release');

if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
}

module.exports = function (name, git) {
    const commend = `cd ${basePath} && git clone ${git} ${name} && cd ${name} && sh shell/unzip.sh`
    return shell.exec(commend).code
}
