const simpleGit = require('simple-git')
const fs = require('fs')
var shell = require('shelljs');

const basePath = '../../release';

if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
}

module.exports = function (name, path) {
    const commend = `cd ${basePath} && git clone ${git} ${name} && cd ${name} && npm i`
    return shell.exec(commend).code
}
