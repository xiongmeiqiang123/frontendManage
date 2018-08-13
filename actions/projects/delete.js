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
    Project.deleteOne({ _id}).then(()=>{
        res.send(response.success())
    }).catch(e=>{
        res.send(response.fail(e))
    });
};
