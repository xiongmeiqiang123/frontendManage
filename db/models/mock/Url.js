const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Url = new Schema({
    url: { type: String },
    type: { type: String },
    note: { type: String },
    query: [
        {
            keys: [
                {
                    key: String,
                    value: String
                }
            ],
            funcs: [
                {
                    name: String
                }
            ]
        }
    ],
    history: [],
    lastUpdater: String
});

module.exports = mongoose.model("Url", Url);
