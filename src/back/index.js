module.exports = (app,db) =>{

    app.get("/api/contacts", (req,res)=>{
        
        db.find({}, function (err, contacts) {
          res.send(JSON.stringify(contacts.map((c)=>{
              return { contact : c.contact };
          }),null,2));
        });

    });



};