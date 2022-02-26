const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const { urlencoded } = require('body-parser');

const app = express();

app.set('view-engine',"ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

//connecting to the database using mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB")
.then(()=>{
    console.log("connected to the database successfully")
})

//creating a schema
const articleSchema = {
    title:String,
    content:String
}

const Article = mongoose.model("Article",articleSchema);

//getting the articles
app.get('/articles',(req,res)=>{
     Article.find((err,foundArticles)=>{
         if(err)res.send(err);
         else res.send(foundArticles);
     })
})

//making a post request

app.post('/articles',(req,res)=>{

    const newArticle = new Article({
        title:"API",
        content:"API stands for application programming interface"
    })
    newArticle.save();
})

//get a specific article
app.route('/articles/:articleTitle')
.get((req,res)=>{
    Article.findOne({title:req.params.articleTitle},(err,item)=>{
        if(item)
        {
            res.send(item)
        }
        else
        {
            res.send("no articles found")
        }
    })
});

app.listen(3000,()=>{
    console.log("listening the port at 3000");
})