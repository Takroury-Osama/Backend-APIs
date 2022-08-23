const jwt = require("jsonwebtoken");
const authConfig = require('./../../config/auth')

module.exports = (req, res, next) => {
    console.log(req.headers);

    if (!req.headers.authorization) {
        //no Access Token
        res.status(401).json({ message: "You have No Authorization in this page!"})
    }
    else {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if(error) {
                res.status(500).json({ message: "Wrong Token!"})
            }
            else {
                req.users = decoded
                next();
            }
        })
    }
}