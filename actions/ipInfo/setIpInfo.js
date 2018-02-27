const IpInfo = require('../../db/models/ipInfo.js')
const {getParamsFromReq} = require('../../components/util')

module.exports = function (req, res, next) {
    let data = getParamsFromReq(req);
    console.log(data);
    res.send({
        status: true
    })
};
