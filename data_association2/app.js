const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectdb = require()


app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(409).send("User with this email already exists.");

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let newUser = await userModel.create({
            username,
            email,
            age,
            name,
            password: hash
        });
        let token = jwt.sign({ email: email, userid: newUser._id }, "secretkey");
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"

        });
        res.redirect('/profile');

    } catch (err) {
        console.error(err);
        res.status(500).send("Error during registration.");
    }
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Incorrect email or password.");

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) return res.status(500).send("Server error during login.");
        if (result) {
            let token = jwt.sign({ email: user.email, userid: user._id }, "secretkey");
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "lax"
            });
            res.redirect('/profile');

        }
        else res.status(401).send("Incorrect email or password.");
    })
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

//middleware for protected routes
function isLoggedIn(req, res, next){
    console.log("Incoming cookies:", req.cookies);
    if(!req.cookies.token){
        console.log("No token found, redirecting...");
        return res.redirect("/login");
    }
    try {
        let data = jwt.verify(req.cookies.token, "secretkey");
        console.log("JWT verified:", data);
        req.user = data;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.redirect("/login");
    }
}


//protected route
app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts'); // Assuming you might want to show posts
    console.log(user);
    res.render("/profile", { user });
})

app.post('/profile', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        const { content } = req.body;
        let post = await postModel.create({
            user: user._id,
            content: content
        });
        user.posts.push(post._id);
        await user.save();
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post.");
    }
})

app.listen(3000, () => {
    console.log("✅ Your server is running on port 3000");
});