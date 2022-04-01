const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use("/", express.static("./public"));

app.get("/api/v1/contacts", (req,res) => {
    res.send([
        {
            name : "pablo",
            phone : 23456
         
        },
        {
            name : "pedro",
            phone : 12566
        }]);
});

app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});


