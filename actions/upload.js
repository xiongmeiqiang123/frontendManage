const fs = require('fs');
const shell = require('shelljs');
const colors = require('../conf/colors');
const pathes = require('../conf/paths.js');
const path = require('path');
const buildinfos = require('../conf/buildinfos')
const {execPromise} = require('../components/util')

module.exports = function uploadCodes(req, res, next) {
    let params = req.body;
    const {module: _module = '', message: _message = '', branch = 'master'} = params;
    const message = _message.replace(/\&|\&\&|\ /g, '_')
    const module = _module.replace(/\&|\&\&|\ /g, '_')
    console.log(module,'module');
    let _path = path.join(__dirname, `../release/${module}`)

    let command = `cd ${_path}  &&  npm run upload -- ${branch} ${message}`

    console.log('release： 正在执行---', command);
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
