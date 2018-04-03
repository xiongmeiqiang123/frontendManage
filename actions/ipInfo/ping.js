const ping = require('tcp-ping');
const {getParamsFromReq} = require('../../components/util')
const response = require('../../components/util/response')
module.exports = async function (req, res, next) {

    const {ip, port} = getParamsFromReq(req);
    if(!ip || !port) {
        return res.send(response.fail('缺少参数, ip/port'))
    }
    ping.probe(ip, port, (err, available)=> {
        if(err || !available) {
            res.send(response.fail('失败'))
        }else {
            res.send(response.success('成功！'))
        }
    })
    // res.send({status: true, data: data})
};
