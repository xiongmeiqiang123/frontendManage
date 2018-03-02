var fs = require("fs");
var shell = require("shelljs");
var colors = require("../conf/colors");
var path = require("path");
let restart = " nginx -s reload",
    open = "nginx";
const {execPromise} = require('../components/util')

function exec(command = "say hello") {
    return shell.exec(command).code;
}

const basePath = path.join(__dirname, '../release')

exports.route = "/action/build";

const testFolder = `${basePath}/miui-sys-front-for-build/src/modules`;
const filesPromise = new Promise(function(resolve, reject) {
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            reject();
        }
        resolve(files);
    });
});
module.exports = function rewriteServer(req, res, next) {
    let params = req.body;
    const { module: _module = "" } = params;
    const module = _module.replace(/\&|\&\&|\ /g, "_");
    filesPromise
        .then((files = []) => {
            let command = `cd ${basePath}/miui-sys-front-for-build && git checkout develop && git pull && npm run build `;
            if (module === "admin") {
                command = `cd ${basePath}/mqs-admin-for-build && git checkout master && git pull && npm run build -- --env.name ${module} `;
            } else {
                command = `${command}-- --env.name ${module} `;
            }
            console.log(command, 'test');
            execPromise(command).then((resultCode) => {
                console.log(resultCode);
                if (resultCode !== 0) {
                    res.send({ status: false });
                } else {
                    res.send({ status: true });
                }
            }).catch((err) => {
                console.log(err);
            })

        })
        .catch(err => {
            res.send({ status: false });
        });
};
