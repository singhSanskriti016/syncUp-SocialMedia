const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let posts = [];
// Home Route
app.get("/", (req, res) => {
    res.send("SyncUp Backend Running");
});

// Register API
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.json({
            message: "Email Already Registered"
        });
    }

    users.push({
        name,
        email,
        password
    });

    res.json({
        message: "User Registered Successfully"
    });

});
// Login API
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {

        res.json({
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } else {

        res.json({
            message: "Invalid Credentials"
        });

    }

});

// Create Post API
app.post("/posts", (req, res) => {

    const { username, content } = req.body;

    const newPost = {
        id: Date.now(),
        username,
        content
    };

    posts.push(newPost);

    res.json({
        message: "Post Created Successfully",
        post: newPost
    });

});
// Get All Posts
app.get("/posts", (req, res) => {
    res.json(posts);
});
// Get All Users
app.get("/users", (req, res) => {
    res.json(users);
});
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});