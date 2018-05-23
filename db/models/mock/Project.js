const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ＭockProject = new Schema({
    name: { type: String },
    team: { type: Array },
    desc: { type: String }
});

module.exports = mongoose.model("mockProject", ＭockProject);
