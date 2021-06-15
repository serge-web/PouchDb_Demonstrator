const express = require("express");
const ejs = require("ejs");

const app = express();
const env = require("./src/utils/env");
const router = require("./src/router");

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/", router); 
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public")) 

const port = env.port;
app.listen(port, console.log(`Server running on port ${port}`));
