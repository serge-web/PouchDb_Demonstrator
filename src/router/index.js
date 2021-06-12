const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/test", (req, res) => {
  res.status(200).render("test", { name: "Jhon" });
});

router.get("/", async (req, res) => {
  var todoLists = await db.findDocument({ type: "todo" });
  //console.log(todoLists);
  res.render("index", {
    todos: todoLists,
  });
});

router.post("/todo/stream", async (req, res) => {
  var { todo } = req.body; 
  console.log("put as normal doc")
  if (todo != undefined) {
    //the post method is like a put but it generates a random _id for the document
    var data = await db.postDocument({ type: "todo", todo });
    console.log(data); 
    res.redirect("/")
  }
});

router.post("/todo/local", async (req, res) => {
  var { todo } = req.body;
  console.log("put as local doc")
  if (todo != undefined) {
    var data = await db.putLocalDocument({ type: "todo", todo });
    console.log(data);
    res.redirect("/")
  }
});

module.exports = router;
