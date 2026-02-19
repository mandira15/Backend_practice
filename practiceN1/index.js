const express = require('express');
const app = express();
const path = require('path');

app.use(express.json()); // parser for JSON bodies
app.use(express.urlencoded({ extended: true})); // parser for JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // for connecting different files like css,js
app.set('view engine', 'ejs'); // for rendering
//basic route
app.get("/", function(req , res){
    res.render("index");
});

app.get("/profile/:username", function(req , res){
     //params is used to handle dynamic routes
    res.send(`welcome, ${req.params.username}`);
});

app.listen(3000, function(){
    console.log("it running");
})