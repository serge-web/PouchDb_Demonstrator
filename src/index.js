const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser") 

const app = express();
const urlencodedParser = bodyParser.urlencoded({exrended:  false})

const env = require("./utils/env");
const router = require("./router");

app.use(express.json());
app.use("/", urlencodedParser, router);
app.set("view engine", "ejs");


const port = env.port;
app.listen(port, console.log(`Server running on port ${port}`));
