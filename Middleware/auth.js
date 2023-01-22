const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

    if (!token) {
        res.status(400).send("No Token is found");
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token")
    }
    return next();
}
module.exports = verifyToken;