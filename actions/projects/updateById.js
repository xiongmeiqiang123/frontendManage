const Project = require('../../db/models/Project.js')
const {getParamsFromReq} = require('../../components/util')
const response = require('../../components/util/response')

module.exports = function (req, res, next) {
    const data = getParamsFromReq(req)
    const {_id} = data;
    if(!_id) {
        res.send(response.fail('缺少id'))
        return;
    }
    Project.findByIdAndUpdate(_id, {$set: data}).then((value) => {
        res.send(response.success('修改成功'))
    }).catch((err) => {
        response.fail(err)
    })
};
