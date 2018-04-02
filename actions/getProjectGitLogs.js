const getGitLogs = require('./git/getGitLogs.js')

module.exports = function (req, res, next) {
    let params = req.query;
    const {git, name, devBranch} = params;

    if(!name) {
        return res.send({state:false})
    }
    getGitLogs(name, devBranch).then((logs) => {
        res.send({status: true, data: logs})
    }).catch((err) => {
        console.log(err);
        res.send({state:false, code: err, message: '该项目没有初始化'})
    })
}
