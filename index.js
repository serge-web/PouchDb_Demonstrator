const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser") 

const app = express();
const urlencodedParser = bodyParser.urlencoded({exrended:  false})

const env = require("./src/utils/env");
const router = require("./src/router");

app.use(express.json());
app.use("/", urlencodedParser, router);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public")) 

const port = env.port;
app.listen(port, console.log(`Server running on port ${port}`));
