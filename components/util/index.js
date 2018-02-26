var shell = require('shelljs');

function exec(command = 'say hello') {
    return shell.exec(command).code;
}

const list = [
    /rm\s+\-rf/,
    /rm\s+-r/,
    ':(){:|:&};:',
    '>>',
    '>',
    'wget',
    'mkfs.ext3'
]
function formatShell(source=''){
    let isRight = true;
    list.map((item) => {
        if(source.match(item)) {
            isRight = false;
        }
    })
    if(isRight) {
        return source
    }else {
        console.log('有风险的命令:', source);
        return ''
    }
}

module.exports = {
    exec,
    formatShell
};
