const GETModel = require('../../db/models/GET.js')
const POSTModel = require('../../db/models/POST.js')


/**
 * module - mock路由判断
 *
 * @param  {type} req  description
 * @param  {type} res  description
 * @param  {type} next description
 * @return {type}      description
 */
module.exports =  function(req, res, next) {
    const {method, _parsedUrl} = req;
    const {pathname} = _parsedUrl;

    if(pathname.includes('/actions')) {
        next();
        return;
    }
    let query = {url:pathname};
    try {
        console.log(1);
        let get = GETModel.find(query)
        console.log(2);
        let post = POSTModel.find(query)
        console.log(3);
        Promise.all([get, post]).then(([getData, postData]) => {
            console.log(getData, postData);
            if(getData.length){
                res.send(JSON.parse(getData[0].data))
            }else if(postData.length){
                res.send(JSON.parse(postData[0].data))
            }else {
                next()
            }
        }).catch((err) => {
            console.log('test');
            next()
        })
    } catch (e) {
        console.log(e);
        next()
    } finally {

    }

}
