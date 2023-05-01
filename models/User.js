const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: String,
    cc: String,
    password: String,
    role: String
});


module.exports = model("User", UserSchema, "users");