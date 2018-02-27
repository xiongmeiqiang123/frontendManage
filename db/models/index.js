const mongoose = require('mongoose');
const config   = require('../config');
const GETModel = require('./GET.js')

module.exports = mongoose.connect(config.db).then((value) => {
    console.log('mongooose connected！');
})

// const db = mongoose.connection;
//
// const get = new GETModel({
//     url:'test',
//     data: '{}'
// })
//
// // get.save().then((value) => {
// //     console.log(value);
// // })
//
//
// GETModel.remove({url:'test'}, function(err, res){
//         if (err) {
//             console.log("Error:" + err);
//         }
//         else {
//             console.log("Res:" + res);
//         }
//     })
