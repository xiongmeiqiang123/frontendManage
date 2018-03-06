const request = require("request");
const response = require('../components/util/response')
module.exports = function(req, res, next) {
    res.send({
        status:true
    })
};
