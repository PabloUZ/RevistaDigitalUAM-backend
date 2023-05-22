const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();


const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Articles
const articleRoutes = require("./routes/article");

app.use("/api", articleRoutes)

// Users
const userRoutes = require("./routes/user");

app.use("/api", userRoutes);



app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
});