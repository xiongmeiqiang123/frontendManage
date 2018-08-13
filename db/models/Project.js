const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Project = new Schema({
    git: {
        type: String,
        required: true
    },
    name: { type: String },
    currentRelease: {
        type: String
    },
    devBranch: {
        type: String,
        default: 'master'
    },
    modules: {
        type: Array,
        
    },
    defaultReleaseBranch: {
        type: String,
        default: 'master'
    },
    note: {
        type: String
    }

});

module.exports = mongoose.model('Project',Project);
