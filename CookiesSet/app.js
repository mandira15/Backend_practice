const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Add the cookie-parser middleware
app.use(cookieParser());

app.get("/", function(req, res){
    let token = jwt.sign({email: "minni2gmail.com"}, "secret");
    res.cookie('token', token);
    console.log(token);
    res.send('done');
    // Use the asynchronous `bcrypt.compare` to avoid blocking other requests.
    // It correctly uses a callback.
    // bcrypt.compare("msywst", "$2b$10$lRfN8L/VSPzMsgWXhp/uI.a4xBXpSLRrjQTZVn5J3SfsN8aMdY8e.", function(err, result){
    //     if (err) {
    //         console.error("Error comparing hashes:", err);
    //         // It's good practice to handle errors and send a response.
    //         return res.status(500).send("An error occurred during password comparison.");
    //     }
    //     console.log("Comparison result:", result); // Will be true or false
    //     // You must send a response back to the client.
    //     res.send(`Password comparison result: ${result}`);
    // });
})

app.get("/read", function(req, res){
    // Now that cookie-parser is used, req.cookies will be populated.
    let data = jwt.verify(req.cookies.token, 'secret');
    console.log(data);
})

app.listen(3000);
console.log("Server is running on http://localhost:3000");