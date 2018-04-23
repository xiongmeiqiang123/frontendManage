const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Pv = new Schema({
    url:{
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    count: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Pv',Pv);
