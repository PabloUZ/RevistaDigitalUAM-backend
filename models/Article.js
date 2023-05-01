const { Schema, model } = require("mongoose");
const User = require("./User");

const ArticleSchema = Schema({
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    url: String,
    status: String,
    author: User
});


module.exports = model("Article", ArticleSchema, "articles");