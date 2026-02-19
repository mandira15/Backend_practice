const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get('/', function(req, res){
    res.send("");
});

app.get('/create', async function(req, res){
    let user = await userModel.create({
        username: "minni",
        age: 21,
        email: "minni@gmail.com"
    });
    res.send(user);
})

app.get('/post/create', async function(req, res){
    let post = await postModel.create({
        postData: "This is my first post",
        user: "68bd62704068a8d1fdfc56d7"
    })
    let user = await userModel.findOne({_id: "68bd62704068a8d1fdfc56d7"});
    user.posts.push(post._id);
    await user.save(); //since its async task
    res.send(post, user);
})

app.listen(3000);