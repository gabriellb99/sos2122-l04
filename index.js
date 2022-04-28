const express = require("express");
const bodyParser = require("body-parser");
const back = require("./src/back");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
back(app);

app.use("/", express.static("./public"));

app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});


