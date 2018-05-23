const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MockUrl = new Schema({
    url: { type: String },
    type: { type: String },
    note: { type: String },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'mockPage'
    }],
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

module.exports = mongoose.model("mockUrl", MockUrl);
