const Pv = require('../../db/models/Pv.js')
const {getParamsFromReq} = require('../../components/util/index.js')
const response = require('../../components/util/response')
const _ = require('lodash')
module.exports = async function (req, res, next) {
    const {url, name} = getParamsFromReq(req)
    Pv.find({}, {__v:false}).then(data => {
        data = data.reduce((result, next) => {
            let url = next.url;
            if(result[url]) {
                result[url] = result[url] + next.count
            }else {
                result[url] = next.count;
            }
            return result;
        }, {})
        res.send(response.success(data))
    }).catch((err) => {
        res.send(response.fail(err))
    })
}
