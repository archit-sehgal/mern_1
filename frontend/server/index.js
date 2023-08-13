const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use("/admin", adminRouter)
app.use("/", userRouter)

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


app.listen(3000, () => {
    console.log("started server on: " + 3000);
})