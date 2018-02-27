const IpInfo = require('../../db/models/ipInfo.js')

module.exports = async function (req, res, next) {
    let infos = await IpInfo.find({});
    res.send({status: true, data: infos})
};
