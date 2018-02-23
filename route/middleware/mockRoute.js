const GETModel = require('../../db/models/GET.js')
const POSTModel = require('../../db/models/POST.js')

module.exports =  function(req, res, next) {
    const {method, _parsedUrl} = req;
    const {pathname} = _parsedUrl;
    let query = {url:pathname};
    let get = GETModel.find(query)
    let post = POSTModel.find(query)
    Promise.all([get, post]).then(([getData, postData]) => {
        if(getData.length){
            res.send(getData[0].data)
        }else if(postData.length){
            res.send(postData[0].data)
        }else {
            next()
        }
    })
    // db.connect('mqsas').then((db) => {
    //     db.find(method, {url:pathname}).then((data) => {
    //         console.log(data, 'test');
    //         if(data.length){
    //             res.send(data[0].data)
    //         }else {
    //             next()
    //         }
    //     })
    // })
}
