const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Mock_history = new Schema({
    urlId: {
        type: Schema.Types.ObjectId,
        ref: 'mockUrl'
    },
    userName: { type: String },
    email: { type: String },
    lastData: { type: Object },
    time: {type: Date, default: new Date()}
});

module.exports = mongoose.model("mockHistory", Mock_history);
