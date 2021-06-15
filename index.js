const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const env = require("./src/utils/env");
const router = require("./src/router");
const { initializeLocalDocStore } = require("./src/router/document");

app.use(cookieParser("cookie-secret"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//create a store for local documents (if it is not created)
initializeLocalDocStore();

const port = env.port;
app.listen(port, console.log(`Server running on port ${port}`));
