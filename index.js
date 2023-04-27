const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();


const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());


app.get("/prueba", (req,res) => {
    return res.status(200).json({
        "text":"Hola mundo"
    })
});




app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
});