const request = require("request");
const response = require("../components/util/response");
const Pv = require("../db/models/Pv.js");
const { getParamsFromReq } = require("../components/util");
module.exports = async function(req, res, next) {
    const { url, name, time } = getParamsFromReq(req);
    let pv = new Pv({
        url,
        name,
        time
    });

    let data = await Pv.find({ url });

    if (data.length) {
        let _data = data[0];
        await Pv.findOneAndUpdate(
            { url },
            {
                count: _data.count + 1,
                names: _data.names.match(name)
                    ? _data.names
                    : `${_data.names},${name}`
            }
        );
    } else {
        await pv.save();
    }
    res.send(response.success(""));
};
