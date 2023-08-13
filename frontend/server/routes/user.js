const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const {User,Course,Admin}=require("../db");
const router=express.Router()

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (error) {
        res.status(500).send("Error fetching courses");
    }
});
router.get("/:coursetitle", async (req, res) => {
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
module.exports=router