var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')
var path = require('path')
let restart = ' nginx -s reload',
	open = 'nginx'


function exec(command='say hello') {
	return shell.exec(command).code;
}

exports.route = '/action/build'
module.exports = function rewriteServer(req, res, next) {
    let params = req.body;
	const {
		module,
	} = params;
	const command = `cd /home/mi/workspace && git clone git@git.n.xiaomi.com:xiongmeiqiang/miui-sys.git miui-sys-front-for-build && cd miui-sys-front-for-build && npm i`


	let resultCode = exec(command);
	if(resultCode !== 0) {
		res.send({status: false})
	}else {
		res.send({status: true})
	}
}
