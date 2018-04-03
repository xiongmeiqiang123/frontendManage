const IpInfo = require('../../db/models/ipInfo.js')
const ping = require('tcp-ping');
module.exports = async function (req, res, next) {
    let infos = await IpInfo.find({});
    const data = infos.map((item) => {
        const {
            _id: id,
            name,
            ip,
            port,
            key,
            msg,
            isFront
        } = item;
        return {
            id,
            name,
            ip,
            port,
            key,
            msg,
            isFront
        }
    })


    // let dataPromsie =  data.map((item) => {
    //     let path = `http://${item.ip}:${item.port}`;
    //     return new Promise(function(resolve, reject) {
    //         ping.probe(item.ip, item.port, (err, available)=> {
    //             if(err || !available) {
    //                 item.status = false;
    //                 resolve()
    //             }else {
    //                 item.status = true
    //                 resolve()
    //             }
    //         })
    //     });
    //
    // })
    // await Promise.all(dataPromsie)

    res.send({status: true, data: data})
};
