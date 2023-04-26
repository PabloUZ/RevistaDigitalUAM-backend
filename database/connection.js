const mongoose = require("mongoose");


const connection = async() => {
    try{

        await mongoose.connect("mongodb://127.0.0.1:27017/revista_uam");
        console.log("Connection successful");

    }catch(error){
        throw new Error(`WHOOPS... Couldn't connect to database.\n${error}`);
    }
}

module.exports = {
    connection
}