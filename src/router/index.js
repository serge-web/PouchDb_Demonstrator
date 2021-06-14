const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/test", (req, res) => {
  res.status(200).render("test", { name: "Jhon" });
});

router.get("/", async (req, res) => {
  try {
    //get Normal docs
    var todoLists = await db.findDocument({ type: "todo" });

    //get Local doc ids using find method and get data from each id
    var localDocIds = await db.findDocument({ type: "local_doc_id" });
    var store = [];
    for (var i = 0; i < localDocIds.length; i++) {
      var id = localDocIds[i].id;
      var localDoc = await db.getDocument(id);
      store.push(localDoc);
    }

    res.render("index", {
      normalTodos: todoLists,
      localTodos: store,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/todo/stream", async (req, res) => {
  try {
    var { todo } = req.body;
    console.log("put as normal doc");
    if (todo != undefined) {
      //the post method is like a put but it generates a random _id for the document
      var data = await db.postDocument({
        type: "todo",
        docType: "normalDoc",
        todo,
      });
      console.log(data);
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/todo/local", async (req, res) => {
  try {
    var { todo } = req.body;
    console.log("put as local doc");
    if (todo != undefined) {
      var data = await db.putLocalDocument({
        type: "todo",
        docType: "localDoc",
        todo,
      });

      //save id of this local document as a normal document
      var localDoc = await db.postDocument({
        type: "local_doc_id",
        id: data.id,
      });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
