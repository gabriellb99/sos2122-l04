const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.get("/api", (req,res) => {
    console.log("Requested / route");
    res.send({result: true})
});

app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
})
