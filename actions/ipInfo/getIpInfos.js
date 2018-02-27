const IpInfo = require('../../db/models/ipInfo.js')

module.exports = async function (req, res, next) {
    let infos = await IpInfo.find({});
    const data = infos.map((item) => {
        const {
            _id: id,
            name,
            ip,
            port,
            key,
            msg,
            isFront
        } = item;
        return {
            id,
            name,
            ip,
            port,
            key,
            msg,
            isFront
        }
    })

    // console.log(data);
    res.send({status: true, data: data})
};
