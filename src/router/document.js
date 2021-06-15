const db = require("../database/index");


const initializeLocalDocStore = async () => {
  if (!(await isLocalDocStoreCreated())) {
    var localDoc = await db.postDocument({
      type: "localDocumentStore",
      localDocIds: [],
    });
    console.log("Local document store created")
  }
};

const isLocalDocStoreCreated = async () => {
  var store = await db.findDocument({ type: "localDocumentStore" });
  var status = false;
  if (store.length > 0) {
    status = true;
  }
  return status;
};

module.exports = {

  initializeLocalDocStore,
};
