const mangoose = require("mongoose");
// require("..//models/user.js")
const User = mangoose.model('User')
const jwt = require("jsonwebtoken")
const { jwt_key } = require('../keys')


module.exports = (req,res,next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.json("you must be logged in first")
    }
    // authorization === Bearer afshgdhdgfhfh
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwt_key,(err,payload)=>{
        if(err){
            return res.status(422).json({error : "you must be logged in first"})
        }

        const {_id } = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata;
            next();
        })
        
    })
}