const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

port = 3000
const secretKey = "superS3cr3t1";
// jwt
const authenticateJwt = (req, res, next) => {
    const authHead = req.headers.authorization;
    if (authHead) {
        const token = authHead.split(" ")[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return (err);
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.send("forbidden")
    }

}

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String
});
const adminSchema = new mongoose.Schema({
    adminId: String,
    password: String
});
const courseSchema = new mongoose.Schema({
    title: String,
    desc: String,
    price: Number
});
// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// connect to mongodb
mongoose.connect("mongodb+srv://architsehgal:Architgr8@mernapp.sxuwmfu.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
// -----------------------------
// get all [global]
app.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (error) {
        res.status(500).send("Error fetching courses");
    }
});
app.get("/:coursetitle", async (req, res) => {
    const coursetitle = req.params.coursetitle;
    const findcourse = await Course.findOne({ title: coursetitle });
    if (findcourse) {
        try {
            res.json({ findcourse });
        }
        catch (err) {
            console.log(err);
            res.send("server err")
        }
    }
    else {
        res.redirect("/")
    }
})

// -----------------------------
// admin portal
app.post("/admin/signup", async (req, res) => {
    const { adminname, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ adminId: adminname })
        if (existingAdmin) {
            return res.status(300).send("admin already exists")
        }
        else {
            const newAdmin = new Admin({
                adminId: adminname,
                password: password
            });
            await newAdmin.save();
            const token = jwt.sign({ adminname, password }, secretKey, { expiresIn: "1hr" });
            res.json({ messsage: "admin created successfuly", token });
        }
    }
    catch (err) {
        console.log(err)
        res.send("server err")
    }
})
app.post("/admin/login", authenticateJwt, async (req, res) => {
    const { adminname, password } = req.body;
    const existingAdmin = await Admin.findOne({ adminId: adminname })
    if (existingAdmin) {
        const token = jwt.sign({ adminname, password }, secretKey, { expiresIn: "10hr" })
        res.json({ message: "admin logged in", token });
    } else {
        res.status(400).send("admin not registered");
    }
})
app.post("/admin/courses", authenticateJwt, async (req, res) => {
    const { title, desc, price } = req.body;
    const existingCourse = await Course.findOne({ title: title });
    if (existingCourse) {
        res.json({ message: "course already exists", existingCourse })
    } else {
        const newCourse = new Course({
            title: title,
            desc: desc,
            price: price
        })
        await newCourse.save()
        res.json({ message: "course created successfully", newCourse });
    }
})
app.post("/admin/courses/:coursetitle", authenticateJwt, async (req, res) => {
    const coursetitle = req.params.coursetitle;
    const existingCourse = await Course.findOne({ title: coursetitle })
    if (existingCourse) {
        try {
            const updatedCourse = req.body;
            existingCourse.title = updatedCourse.title;
            existingCourse.desc = updatedCourse.desc;
            existingCourse.price = updatedCourse.price

            await existingCourse.save();
            res.json({ message: "course updates successfully", existingCourse });
        }
        catch (err) {
            console.log(err)
            res.send("server err")
        }
    } else {
        res.send("course not found")
    }
})
// -----------------------------
// user portal





app.listen(port, () => {
    console.log("started server on: " + port);
})