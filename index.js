const express = require("express");
const bodyParser = require("body-parser");
const back = require("./src/back");
const request = require("request");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

app.use(bodyParser.json());

var paths='/remoteAPI'
back(app);

var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-glb.herokuapp.com/api/v1/contacts';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

app.use("/", express.static("./public"));

app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});


