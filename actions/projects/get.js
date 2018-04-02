const Project = require('../../db/models/Project.js')

module.exports = function (req, res, next) {
    Project.find().then((data) => {
        res.send({
            status: true,
            data
        })
    }).catch((err) => {
        res.send({
            status: false,
            msg: err
        })
    })
};
