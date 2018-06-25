const request = require("request");
const response = require("../components/util/response");
const Pv = require("../db/models/Pv.js");
const moment = require('moment')

const { getParamsFromReq } = require("../components/util");

const MONTH_FORMAT = 'YYYY-MM'
module.exports = async function(req, res, next) {
    const { url, name, menu=[] } = getParamsFromReq(req);
    if(!url || !name) {
        return res.send(response.fail('缺少参数'))
    }
    let date = moment().format(MONTH_FORMAT)
    let pv = new Pv({
        url,
        name,
        date,
        menu
    });
    
    try {
        let data = await Pv.find({ url, name , date});
        if (data.length) {
            let _data = data[0];
            await Pv.findOneAndUpdate(
                { url, name },
                {
                    $inc: {
                        count:1
                    }
                }
            );
        } else {
            await pv.save()
        }
        res.send(response.success(""));
    } catch (e) {
        console.log(e);
        res.send(response.fail(e));
    } finally {

    }


};
