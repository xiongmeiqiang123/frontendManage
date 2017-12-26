var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')
    var path = require('path')
        let restart = ' nginx -s reload',
            open = 'nginx'

        function exec(command = 'say hello') {
            return shell.exec(command).code;
        }

        exports.route = '/action/build'

        const testFolder = '/home/mi/workspace/miui-sys-front/src/modules';
        const filesPromise = new Promise(function(resolve, reject) {
            fs.readdir(testFolder, (err, files) => {
                if (err) {
                    reject()
                }
                resolve(files)
            })
        });
        module.exports = function rewriteServer(req, res, next) {
            let params = req.body;
            const {module} = params;

            filesPromise.then((files = []) => {
                let command = `cd /home/mi/workspace/miui-sys-front-for-build && git checkout develop && git pull && npm run build `
                if (module === 'admin') {
                    command = `${command} -- --env.name ${module} `
                } else if (files.includes(module)) {
					command = `${command}-- --env.name ${module} `
				} else {
					
				}

                let resultCode = exec(command);
                if (resultCode !== 0) {
                    res.send({status: false})
                } else {
                    res.send({status: true})
                }
            }).catch((err) => {
                res.send({status: false})
            })

        }
