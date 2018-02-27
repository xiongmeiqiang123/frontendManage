const IpInfo = require('../../db/models/ipInfo.js')
const {getParamsFromReq} = require('../../components/util')
const response = require('../../components/util/response')

module.exports = function (req, res, next) {
    let {
        id,
        ip,
        name,
        key,
        port = 80,
        isFront,
        msg
    } = getParamsFromReq(req);

    if(!id) {
        res.send(response.fail('缺少参数'))
        return;
    }

    let updateData = {}
    if(name) {
        updateData.name = name;
    }
    if(ip) {
        updateData.ip = ip;
    }
    if(isFront) {
        updateData.isFront = isFront;
    }
    if(key) {
        updateData.key = key;
    }
    if(port) {
        updateData.port = port;
    }
    if(msg) {
        updateData.msg = msg;
    }

    console.log(id, updateData);
    IpInfo.findByIdAndUpdate(id, {$set: updateData}).then((value) => {
        res.send(response.success('test'))
    })
};
