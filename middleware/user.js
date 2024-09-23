const {  User } = require("../db/index");
const jwt = require('jsonwebtoken')
const secret = require('../config')

function userMiddleware(req,res,next){

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, secret)
    if (decodedValue.username) {
        req.username = decodedValue.username;
        next();
    } else {
        res.status(404).json({
            msg: "User Not Authenticated"
        })
    }
    // const username = req.headers.username;
    // const password = req.headers.password;

    // User.findOne({
    //     username:username,
    //     password:password
    // })
    // .then(function (value){
    //     if(value){
    //         next();
    //     }else{
    //         res.status(404).json({
    //            msg:"User doesn't exist"
    //         })
    //     }
    // })

}


module.exports = userMiddleware;