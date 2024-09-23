const jwt = require("jsonwebtoken");
const {jwt_Secret} = require("../config");
const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {

    try{
        const token = req.headers.authorization;
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedValue = jwt.verify((jwtToken), jwt_Secret);
        if (decodedValue.username) {
            next();
        } else {
            res.status(404).json({
                msg: "User Not Authenticated"
            })
        }
    }catch(error){
        res.json({
            mesaage:"Incorrect Inputs"
        })
    }

    // const username = req.headers.username;
    // const password = req.headers.password;

    // Admin.findOne({
    //     username:username,
    //     password:password
    // })
    // .then(function (value){
    //     if(value){
    //         next();
    //     }else{
    //         res.status(404).json({
    //            msg:"Admin doesn't exist"
    //         })
    //     }
    // })

}


module.exports = adminMiddleware;