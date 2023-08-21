const jwt = require('jsonwebtoken');
const User = require('../model/user');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try{
        let token = req.headers.authorization.split(' ')[1];

        const { email, password } = req.body;

        jwt.verify(token, jwtSecret, (err, decoded) => {

            if(err){
                res.status(401).send("Authentication failed");
                return;
            }
            
            next();
        })

    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = authMiddleware;