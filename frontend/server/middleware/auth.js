const jwt = require("jsonwebtoken");
const secretKey = "superS3cr3t1";

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
module.exports={
    authenticateJwt,
    secretKey
}