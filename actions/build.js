const fs = require("fs");
const shell = require("shelljs");
const colors = require("../conf/colors");
const path = require("path");
const restart = " nginx -s reload",
    open = "nginx";
const { execPromise } = require("../components/util");
const basePath = path.join(__dirname, "../release");

exports.route = "/action/build";

//获取主站的各个模块
const sysFilePath = `${basePath}/for-build/src/modules`;
const filesPromise = new Promise(function(resolve, reject) {
    fs.readdir(sysFilePath, (err, files) => {
        if (err) {
            reject();
        }
        resolve(files);
    });
});


module.exports = function rewriteServer(req, res, next) {
    let params = req.body;
    const { module: _module = "" , project = {}} = params;
    const module = _module.replace(/\&|\&\&|\ /g, "_");
    const {name: projectName, devBranch='master', git} = project;

    filesPromise
        .then((files = []) => {

            let command = `cd ${basePath}/${projectName} && git checkout ${devBranch} && git pull && npm run build -- --env.name ${module} `;
            console.log('正在打包 --- '+ command);
            execPromise(command)
                .then(resultCode => {
                    console.log(resultCode);
                    if (resultCode !== 0) {
                        res.send({ status: false });
                    } else {
                        res.send({ status: true });
                    }
                })
                .catch(err => {
                    res.send({ status: false });
                    console.log(err);
                });
        })
        .catch(err => {
            res.send({ status: false });
        });
};
