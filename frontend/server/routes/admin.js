const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Course, Admin } = require("../db");
const { secretKey, authenticateJwt } = require("../middleware/auth")
const router = express.Router();

router.get("/me", authenticateJwt, (req, res) => {
    res.json({
        adminname: req.user.adminname
    })
})
router.post("/signup", async (req, res) => {
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
router.post("/login", authenticateJwt, async (req, res) => {
    const { adminname, password } = req.body;
    const existingAdmin = await Admin.findOne({ adminId: adminname })
    if (existingAdmin) {
        const token = jwt.sign({ adminname, password }, secretKey, { expiresIn: "10hr" })
        res.json({ message: "admin logged in", token });
    } else {
        res.status(400).send("admin not registered");
    }
})
router.post("/courses", authenticateJwt, async (req, res) => {
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
router.post("/courses/:coursetitle", authenticateJwt, async (req, res) => {
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
module.exports = router