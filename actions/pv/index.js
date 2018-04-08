const Pv = require("../../db/models/Pv.js");
const { getParamsFromReq } = require("../../components/util/index.js");
const response = require("../../components/util/response");
const _ = require("lodash");
module.exports = async function(req, res, next) {
    const { url, name, type  } = getParamsFromReq(req);

    let data = await Pv.find({}, { __v: false }).catch(err => {
        return [];
    });
    console.log(type, 'type');
    switch (type) {
        case '0':
            data = data.reduce((result, next) => {
                let url = next.url;
                if (result[url]) {
                    result[url] = result[url] + next.count;
                } else {
                    result[url] = next.count;
                }
                return result;
            }, {});
            data = Object.keys(data)
                .map((url) => ({url: url, count: data[url]}))
                .sort((a,b)=>(b.count - a.count))

            break;
        case '1':
            data = data.reduce((result, next) => {
                let url = next.url;
                result[url] = result[url] || [];
                let item = result[url]

                if(item.indexOf(next.name) === -1) {
                    item.push(next.name)
                }
                return result;
            }, {});

            data = Object.keys(data)
                .map((url) => ({url: url, name: data[url]}))
                .sort((a,b)=>(b.name.length - a.name.length))
            break;
        default:
            break;
    }
    res.send(response.success(data));
};
