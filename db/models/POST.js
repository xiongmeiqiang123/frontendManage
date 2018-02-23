const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GETModel = new Schema({
    url: {
        type: String,
        unique: true
    },
    data: { type: String }
});

module.exports = mongoose.model('POST',GETModel);
