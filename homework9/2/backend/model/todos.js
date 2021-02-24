const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = Schema({
    isDone: {
        type: Boolean,
    },
    body: {
        type: String,
    },
    creation_date: {
        type: Date, 
        default: Date.now
    }
});
module.exports = Todos = mongoose.model("Todo", TodoSchema );