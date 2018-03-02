var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors');
var pathes = require('../conf/paths.js');
var path = require('path');
const {execPromise} = require('../components/util')

module.exports = function uploadCodes(req, res, next) {
    let params = req.body;
    const {module: _module = '', message: _message = '', branch = 'master'} = params;
    const message = _message.replace(/\&|\&\&|\ /g, '_')
    const module = _module.replace(/\&|\&\&|\ /g, '_')
    let command = `cd ${pathes.miuiFront}  &&  npm run upload -- ${branch} ${message}`
    if (module === 'admin') {
        command = `cd ${pathes.admin} && npm run upload -- ${branch} ${message}`
    }
    console.log('正在执行---', command);
    execPromise(command).then((resultCode) => {
        if (resultCode !== 0) {
            res.send({status: false})
        } else {
            res.send({status: true})
        }
    }).catch((err) => {
        res.send({status: false, msg: err})
    })



}
