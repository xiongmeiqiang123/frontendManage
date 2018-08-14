const initGit = require('./git/initGit.js')

module.exports = function (req, res, next) {
    const {query={}} = req;
    const {name, git, devBranch = 'master'} = query;
    let code = initGit(name, git, devBranch)
    if (code !== 0) {
        res.send({status: false})
    }else {
        res.send({status: true})
    }
}
