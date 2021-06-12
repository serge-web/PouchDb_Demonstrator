const pouchDB = require("pouchdb")

pouchDB.plugin(require('pouchdb-adapter-node-websql')); 
pouchDB.plugin(require('pouchdb-find'))

var db = new pouchDB('mydatabase.db', {adapter: 'websql'});

module.exports = db
