var shell = require('shelljs');

function exec(command = 'say hello') {
    return shell.exec(command).code;
}

module.exports = {
    exec
};
