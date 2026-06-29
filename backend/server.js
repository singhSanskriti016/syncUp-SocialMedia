const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.log(err.message);
});


// Home Route
app.get("/", (req, res) => {
    res.send("SyncUp Backend Running");
});

// Register API
app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "Email Already Registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
// Login API
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.json({
                message: "User Not Found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.json({
                message: "Invalid Password"
            });

        }

        res.json({
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
// Create Post API
app.post("/posts", async (req, res) => {

    try {

        const { username, content } = req.body;

        const newPost = new Post({
            username,
            content
        });

        await newPost.save();

        res.json({
            message: "Post Created Successfully",
            post: newPost
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
// Get All Posts
app.get("/posts", async (req, res) => {

    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
// Delete Post API
app.delete("/posts/:id", async (req, res) => {

    try {

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post Not Found"
            });

        }

        res.json({
            message: "Post Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
// Get All Users
app.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something Went Wrong"
        });

    }

});
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});