const request = require("request");
const response = require('../components/util/response')
module.exports = function(req, res, next) {
    const { query = {} } = req;
    const { ticket, service } = query;
    if(!ticket) {
        res.send({
            status: false
        })
    }
    request(
        `https://casdev.mioffice.cn/validate?ticket=${ticket}&service=${service}`,
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const message = response.body.split("\n");
                if (message[0] === "no") {
                    res.status(302).send({status:false})
                } else if (message[0] === "yes") {
                    req.xiaomi_check = message[1];
                    res.cookie("xiaomi_check", message[1], { maxAge: 600000 });
                    next();
                }
            }else {
                res.status(302).send({status:false})
            }
        }
    );
};
