const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let IpInfoModel = new Schema({
    ip: String,
    port: String,
    name: String,
    key: String,
    isFront: {
        type: Boolean,
        default: false
    },
    desc: String
});

module.exports = mongoose.model('ipinfo',IpInfoModel);
