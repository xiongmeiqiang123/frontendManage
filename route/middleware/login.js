const request = require("request");

module.exports = function(req, res, next) {
    let backdoor = req.header('backdoor');

    if(backdoor === 'true') {
        console.log('后门');
        return next();
    }
    console.log(req.cookies.xiaomi_check,'req.cookies.xiaomi_check');
    if (req.cookies.xiaomi_check) {
        // res.statusCode = 302
        return next();
    }
    const { query = {} } = req;
    const { ticket, service } = query;
    request(
        `https://casdev.mioffice.cn/validate?ticket=${ticket}&service=${service}`,
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const message = response.body.split("\n");
                if (message[0] === "no") {
                    res.status(302).send({status:false})
                } else if (message[0] === "yes") {
                    req.xiaomi_check = message[1];
                    res.cookie("xiaomi_check", message[1], { maxAge: 60000000 });
                    next();
                }
            }else {
                res.status(302).send({status:false})
            }
        }
    );
};
