const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userModel = require('./usermodels');

app.get("/", (req, res) => {
    res.send("hey");
})

app.get('/create', async (req, res) => {
    let createduser =  await userModel.create({
        name: "minni",
        email: "mandira38@gmail.com",
        username: "mandira"
    })
    res.send(createduser);
})

app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({username: "miraj"}, {name: "manu"}, {new: true}) ;   //findOneAndUpdate() finds a single object
    res.send(updateduser);
})

app.get("/read" , async (req, res) => {
    let user = await userModel.find();      //find() gives an array of all users
    res.send(user);
})

app.get("/delete", async (req, res) => {
    let users = await userModel.findOneAndDelete({username: "mandira"}); //findOneAndDelete() deletes a single object
})

app.listen(port, () => {
    console.log(`Server is running and listening on http://localhost:${port}`);
});