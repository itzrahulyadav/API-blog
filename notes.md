//routing in express

instead of creating 
app.get()
then 
app.post()
then
app.delete() and so on
we can route them and chain them into one to reduce redundency

app.route("/articles").get(()=>{
    //some code

}).post(()=>{
   // some code
}).delete(()=>{
    //some code
})