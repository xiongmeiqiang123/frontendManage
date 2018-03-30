const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Project = new Schema({
    git: {
        type: String
    },
    name: { type: String }
});

module.exports = mongoose.model('Project',Project);
