var shell = require("shelljs");

function execPromise(command = 'say hello') {
    return new Promise(function(resolve, reject) {
        shell.exec(command, function (code, stdout, stderr) {
            if(code === 0) {
                resolve(code)
            }else {
                reject(stderr)
            }
        });
    });
}

module.exports = execPromise;
