const IpInfo = require('../../db/models/ipInfo.js')

module.exports = async function (req, res, next) {
    let infos = await IpInfo.find({}, {_id:0, __v:0});
    res.send({status: true, data: infos})
};
