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
    var localDocIds = (await db.findDocument({ type: "localDocumentStore" })) 
    var localDocId = localDocIds[0].localDocIds
    var array = []; 

    for (var i = 0; i < localDocId.length; i++) {
      var id = localDocId[i]
      var localDoc = await db.getDocument(id);
      array.push(localDoc);
    }

    res.render("index", {
      normalTodos: todoLists,
      localTodos: array, 
      messages: req.flash('info')
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
      //this post method is like a put but it generates a random _id for the document
      var data = await db.postDocument({
        type: "todo",
        docType: "normalDoc",
        todo,
      });
      console.log(data); 
      req.flash('info', 'Normal document added successfully')
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    req.flash('info', 'Sync error')
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

      //get document which stores local document ids, store
      var store = await db.findDocument({ type: "localDocumentStore" });
      store[0].localDocIds.push(data.id)  
      db.updateDocument(store[0])
      req.flash('info', 'Local document added successfully')
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    req.flash('info', 'Sync error')
  }
});

module.exports = router;
