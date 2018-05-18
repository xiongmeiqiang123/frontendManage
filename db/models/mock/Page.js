const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Page = new Schema({
    url: { type: String },
    name: { type: String },
    note: { type: String },
    apis: [
        {
            urlId: Schema.Types.ObjectId,
            ref: "url"
        }
    ],
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

module.exports = mongoose.model("Page", Page);
