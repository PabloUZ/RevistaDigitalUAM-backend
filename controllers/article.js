const { urlencoded } = require("express");
const fs = require("fs");
const validator = require("validator");
const Article = require("../models/Article");
const path = require("path");
const User = require("../models/User");


const validate = (params) => {
    try{
        const title = validator.isLength(params.title, {min: 5, max: undefined});
        const desc = validator.isLength(params.description, {min: 5, max: undefined});
        const url = validator.isEmpty(params.url);
        const body = validator.isEmpty(params.body);
        if(!title || !desc || url || body ){
            throw new Error("Param is not correct");
        }
        return true;
    }catch(err){
        return false;
    }
}

const POST = async (req, res) => {
    let params = req.body;
    const id = params.iduser;
    let user = await User.find({cc: id}).exec();
    if (!user){
        return res.status(400).json({Error: "Something failed"});
    }
    user = user[0];
    params.title = params.title.split(" ").join("-");
    params.url = `./articles/article_${params.title}.txt`;
    if (!validate(params)){
        return res.status(400).json({
            message: "Param is not correct"
        })
    }
    try{
        const writeFile = await new Promise ((resolve, reject) => {
            fs.writeFile("./articles/article_"+params.title+".txt",params.body, (e) => {
                if(e){
                    reject(e);
                }
                else{
                    resolve();
                }
            });
        });
    }catch(err){
        return res.status(400).json({
            message: `Error: ${err}`,
        });
    }
    const article = new Article({title: params.title, description: params.description, url: params.url, status: "received", author: user});
    try{
        article.save();
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
    let query = await Article.find({}).exec();
    if (!query){
        return res.status(400).json({Error: "Something failed"});
    }
    return res.status(200).json(query);
}

const GET = async (req, res) => {
    const id = req.params.id;

    let query = await Article.findById(id).exec();

    if (!query){
        return res.status(400).json({error: "Not found"});
    }
    return res.status(200).json(query);
}

const GETFILE = async (req,res) => {
    let file = req.params.filename;
    let route = `./articles/${file}.txt`;


    fs.access(route, (err) => {
        if (!err){
            fs.readFile(route, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(200).json({ content: data });
            });
        }
        else{
            return res.status(404).json({Error: "Not found"});
        }
    })
}

const DELETE = async (req, res) => {
    const id = req.params.id;
    const queryAct = await Article.findById(id).exec();
    const url = queryAct.url;


    fs.unlink(url, (e)=>{
        if(e) return res.status(400).json(queryAct)
    });
    let query = await Article.findByIdAndDelete(id).exec();
    if (!query){
        return res.status(400).json({Error: "Something failed"});
    }
    return res.status(200).json(queryAct);
}

// const UPDATE = async (req, res) => {
//     const id = req.params.id;

//     const params = req.body;
//     if (!validate(params)){
//         return res.status(400).json({
//             message: "Param is not correct"
//         })
//     }

//     let query = await Article.findOneAndUpdate({_id:id}, params).exec();

//     if (!query){
//         return res.status(400).json({Error: "Something failed"});
//     }
//     return res.status(200).json(query);
// }

const UPDATE_STATUS = async (req, res) => {
    const id = req.params.id;
    const params = req.body;

    if(validator.isEmpty(params.status)){
        return res.status(400).json({Error: "Something failed"});
    }

    if(params.status != "accepted" && params.status != "denied"){
        return res.status(400).json({Error: "Something failed"});
    }

    let query = await Article.findOneAndUpdate({_id:id}, {status:params.status}).exec();
    if (!query){
        return res.status(400).json({Error: "Something failed"});
    }
    return res.status(200).json(query);
}

module.exports = {
    POST,
    GETALL,
    GET,
    DELETE,
    //UPDATE,
    UPDATE_STATUS,
    GETFILE
}