const testFolder = '/home/mi/workspace/miui-sys-front/src/modules';
const fs = require('fs');



module.exports = function rewriteServer(req, res, next) {
    fs.readdir(testFolder, (err, files) => {
        if(err) {
            res.send({status: false})
            return;
        }
     	res.send({status: true, data: files})
    })
}
