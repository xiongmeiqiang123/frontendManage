var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')
var path = require('path')
let restart = ' nginx -s reload',
	open = 'nginx'

let command = 'cd /home/mi/workspace/miui-sys-front && npm run build -- --env.name test'

function exec(command='say hello') {
	return shell.exec(command).code;
}
exec(command)
exports.route = '/action/build'
module.exports = function rewriteServer(req, res, next) {
    let params = req.body;
	const {
		module,
	} = params;


}
