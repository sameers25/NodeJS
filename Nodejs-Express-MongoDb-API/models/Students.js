var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* mongo db schema to manage users and related data */

var studentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
        required: true,
        auto: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Students", studentSchema);

