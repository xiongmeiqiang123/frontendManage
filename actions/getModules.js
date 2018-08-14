const folderPath = '../release/miui-sys-front-for-build/src/modules';
const fs = require('fs');
const path = require('path')


module.exports = function rewriteServer(req, res, next) {
    fs.readdir(path.join(__dirname, folderPath), (err, files) => {
        if(err) {
            res.send({status: false})
            return;
        }
     	res.send({status: true, data: files})
    })
}