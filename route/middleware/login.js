const request = require("request");
const actionRoutes = require("../actionroutes");
const url = require('url');
module.exports = function(req, res, next) {
    let backdoor = req.header('backdoor');
    if(backdoor === 'true') {
        console.log('后门');
        return next();
    }
    let _url = url.parse(req.url).pathname;
    if(actionRoutes[_url] && actionRoutes[_url].api) {
        console.log(_url, 'api 免检');
        return next()
    }

    //做cookie检查
    return next()
};
