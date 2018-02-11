const removeGit = require('./git/removeGit.js')

module.exports = function (req, res, next) {
    const {query={}} = req;
    const {name, git} = query;
    let code = removeGit(name, git)
    if (code !== 0) {
        res.send({status: false})
    }else {
        res.send({status: true})
    }
}
