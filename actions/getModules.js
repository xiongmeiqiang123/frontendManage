const path = require('path')
const folderPath = path.join(__dirname, '../release/')

const fs = require('fs');


module.exports = function rewriteServer(req, res, next) {
    fs.readdir(folderPath, (err, files) => {
        if(err) {
            res.send({status: false})
            return;
        }
     	res.send({status: true, data: files})
    })
}
