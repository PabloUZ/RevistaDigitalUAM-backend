const { Schema, model } = require("mongoose");
const User = require("../models/User");

const ArticleSchema = Schema({
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    url: String,
    status: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: undefined
    }
});


module.exports = model("Article", ArticleSchema, "articles");