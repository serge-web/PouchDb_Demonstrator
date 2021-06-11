const express = require("express")
const ejs = require("ejs")
const app = express() 


const env = require("./utils/env")
const router = require("./router")

app.use("/api", router)
app.set("view engine", "ejs")

const port = env.port
app.listen(port, console.log(`Server running on port ${port}`))