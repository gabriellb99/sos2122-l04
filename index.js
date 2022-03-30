const express = require("express");
var Datastore = require('nedb')
  , db = new Datastore();
  
const backend = require("./src/back");

db.insert({ contact: "gabriel"});
db.insert({ contact: "alejandro"});


const port = process.env.PORT || 8080;

const app = express();
backend(app,db);



app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});