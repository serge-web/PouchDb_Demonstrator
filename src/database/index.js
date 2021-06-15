const db = require("./pouch");
const uuid = require("uuid");

const findDocument = async (doc) => {
  var data = await db.find({ selector: doc });
  return data.docs;
};

//normal put method which generates a random _id
const postDocument = async (doc) => {
  var data = await db.post(doc);
  return data;
};

//create a local document
const putLocalDocument = async (doc) => {
  var data = await db.put({ _id: `_local/${uuid.v4()}`, ...doc });
  return data;
};

const getDocument = async (id) => {
  var data = await db.get(id);
  return data;
};

const updateDocument = async (doc) => {
  var data = await db.put(doc);
  console.log(data);
};

module.exports = {
  postDocument,
  findDocument,
  putLocalDocument,
  updateDocument,
  getDocument,
};
