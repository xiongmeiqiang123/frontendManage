const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MockPage = new Schema({
    url: { type: String },
    name: { type: String },
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
    team: [{
        name: String,
        email: String
    }]
});

module.exports = mongoose.model("mockPage", MockPage);
