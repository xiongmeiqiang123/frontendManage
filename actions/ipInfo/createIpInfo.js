const IpInfo = require('../../db/models/ipInfo.js')
const {getParamsFromReq} = require('../../components/util')
const response = require('../../components/util/response')

module.exports = function (req, res, next) {
    let {
        ip,
        name,
        key,
        port = 80,
        isFront,
        msg
    } = getParamsFromReq(req);

    if(!ip || !key) {
        res.send(response.fail('缺少参数'))
    }

    let ipIo = new IpInfo({
        ip,
        name,
        key,
        port,
        isFront,
        msg
    })

    ipIo.save().then((value) => {
        res.send(response.success('test'))
    })
};
