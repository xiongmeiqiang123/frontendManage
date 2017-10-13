const fs = require('fs');
const shell = require('shelljs');
const path = require('path')
const colors = require('../conf/colors')

const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')

module.exports = function(req, res, next) {
    fs.readFile(path.join(__dirname, '../conf/currentData.json'), function (err, result) {
        if(err) {
            res.send({status:false})
            return;
        }

        try {
            result = JSON.parse(result.toString())
        } catch (e) {
            result = {}
        } finally {

        }
        res.send({
            status: true,
            data: result
        })

    })


}
