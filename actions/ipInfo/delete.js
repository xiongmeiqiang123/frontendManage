const IpInfo = require('../../db/models/ipInfo.js')
const {getParamsFromReq} = require('../../components/util')
const response = require('../../components/util/response')

module.exports = async function (req, res, next) {
    const {id} = getParamsFromReq(req)
    console.log(id, '-------id');
    if(!id) {
        res.send(response.fail('缺少id'))
        return ;
    }
    IpInfo.remove({
        _id: id
    }).then((value) => {
        res.send(response.success())
    }).catch((err) => {
        res.send(response.fail())
    })
};
