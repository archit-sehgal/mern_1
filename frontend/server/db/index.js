const mongoose = require("mongoose");

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

module.exports={
    User,
    Admin,
    Course
}