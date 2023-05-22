const { urlencoded } = require("express")
const User = require("../models/User")
const validator = require("validator")

const validate = (params) => {
    try{
        const name = validator.isLength(params.name, {min: 1, max: undefined});
        const cc = validator.isLength(params.cc, {min: 1, max: undefined});
        const pwd = validator.isLength(params.password, {min: 8, max: 20});
        const role = validator.isEmpty(params.role);
        if(!name || !cc || !pwd || role){
            throw new Error("Param is not correct");
        }
        return true;
    }catch(err){
        return false;
    }
}

const POST = (req, res) => {
    let params = req.body;
    if(!validate(params)){
        return res.status(400).json({
            message: "Param is not correct"
        })
    }
    const user = new User(params);
    try{
        user.save();
        return res.status(200).json({
            message: "success",
        });
    }catch(err){
        return res.status(400).json({
            message: `Error: ${err}`,
        });
    }
}

const GETALL = async (req, res) => {
    let query = await User.find({}).exec();
    if (!query){
        return res.status(400).json({Error: "Something failed"});
    }
    return res.status(200).json(query);
}

const GET = async (req, res) => {
    const id = req.params.id;
    let query = await User.find({cc: id}).exec();
    if (!query){
        return res.status(400).json({Error: "Something failed"});
    }
    return res.status(200).json(query);
}
module.exports = {
    POST,
    GETALL,
    GET
}