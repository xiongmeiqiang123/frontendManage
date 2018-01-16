var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors');
var pathes = require('../conf/paths.js');
var path = require('path');
function exec(command = 'say hello') {
    return shell.exec(command).code;
}

module.exports = function uploadCodes(req, res, next) {
    let params = req.body;
    const {module, message = '', branch = 'master'} = params;

    let command = `cd ${pathes.miuiFront}  &&  npm run upload -- ${branch} ${message}`
    if (module === 'admin') {
        command = `cd ${pathes.admin} && npm run upload -- ${branch} ${message}`
    }
    console.log('正在执行---', command);
    let resultCode = exec(command);

    if (resultCode !== 0) {
        res.send({status: false})
    } else {
        res.send({status: true})
    }

}
