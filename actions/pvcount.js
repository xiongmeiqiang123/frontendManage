const request = require("request");
const response = require("../components/util/response");
const Pv = require("../db/models/Pv.js");
const { getParamsFromReq } = require("../components/util");
module.exports = async function(req, res, next) {
    const { url, name } = getParamsFromReq(req);
    if(!url || !name) {
        return res.send(response.fail('缺少参数'))
    }
    let pv = new Pv({
        url,
        name,
        time: new Date()
    });

    let data = await Pv.find({ url, name });


    try {
        if (data.length) {
            let _data = data[0];
            await Pv.findOneAndUpdate(
                { url, name },
                {
                    count: _data.count + 1,
                    time: new Date()
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
