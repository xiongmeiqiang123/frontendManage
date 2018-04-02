const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Project = new Schema({
    git: {
        type: String
    },
    name: { type: String },
    currentRelease: {
        type: String
    },
    devBranch: {
        type: String,
        default: 'master'
    }

});

module.exports = mongoose.model('Project',Project);
