const Project = require('../../db/models/Project.js')
const response = require('../../components/util/response')
const {
    getParamsFromReq
} = require('../../components/util')
module.exports = function (req, res, next) {
    const data = getParamsFromReq(req)
    const {
        git
    } = data;
    if (!git) {
        return res.send(response.fail('缺少git地址'))
    }

    let name = data.name || git.split('/')[1]

    let project = new Project(Object.assign({}, data, {
        name
    }))
    project.save().then(() => {
        res.send(response.success('成功'))
    }).catch(e => res.send(response.fail(e)))
};