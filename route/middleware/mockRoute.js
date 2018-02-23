const Db = require('../../db/Db.js')
let db = new Db();

module.exports =  function(req, res, next) {
    const {method, _parsedUrl} = req;
    const {pathname} = _parsedUrl;

    db.connect('mqsas').then((db) => {
        db.find(method, {url:pathname}).then((data) => {
            console.log(data, 'test');
            if(data.length){
                res.send(data[0].data)
            }else {
                next()
            }
        })
    })
}
