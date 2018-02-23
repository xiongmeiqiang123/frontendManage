const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GETModel = new Schema({
    url: { type: String },
    data: { type: String }
});

module.exports = mongoose.model('test',GETModel);
