const projects = require('../conf/buildinfos.json')

module.exports = function (req, res, next) {
    res.send({status: true, data: projects})
}
