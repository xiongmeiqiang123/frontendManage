const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Template = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    inputs: [{
        name: String,
        key: String,
        url: String,
        relativeKey: String,
        multiple: Boolean,
        defaultValueLength: Number,
        list: [{name: String, value: String}]
    }],
    displayInfo: {
        chartType: String,
        title: String,
        xLabel: String,
        yLabel: String,
        showList: [{name: String, key: String}],
        scale: String,
        isNeedTime: Boolean,
        barId: String, 
        legendId: String,
        dotId: String,
    }
});

module.exports = mongoose.model('Template', Template);