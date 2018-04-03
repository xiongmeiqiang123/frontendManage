const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Pv = new Schema({
    url:{
        type: String,
        unique: true
    },
    names: {
        type: String,
        default: []
    },
    time: {
        type: String
    },
    count: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Pv',Pv);
