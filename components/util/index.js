var shell = require("shelljs");

function exec(command = "say hello") {
    return shell.exec(command).code;
}
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
const list = [
    /rm\s+\-rf/,
    /rm\s+-r/,
    ":(){:|:&};:",
    ">>",
    ">",
    "wget",
    "mkfs.ext3"
];
function formatShell(source = "") {
    let isRight = true;
    list.map(item => {
        if (source.match(item)) {
            isRight = false;
        }
    });
    if (isRight) {
        return source;
    } else {
        console.log("有风险的命令:", source);
        return "";
    }
}

function getParamsFromReq(req = {}, type) {
    let result = {};
    /**
     * JSON    POST
     */
    let params = req.body || {};
    /**
     * query GET
     */
    const { query = {} } = req;

    Object.assign(result, params, query);

    return result;
}
module.exports = {
    exec,
    execPromise,
    formatShell,
    getParamsFromReq
};
