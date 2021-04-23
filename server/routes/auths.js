const express = require("express")
const router = express.Router();
const mangoose = require("mongoose");
const User = mangoose.model('User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { jwt_key } = require('../keys')
// const requirelogin = require("../middelware/requireLogin.js")

router.get('/',(req,res)=>{
    res.send("hello");
})

// router.get('/protected',requirelogin,(req,res)=>{
//     res.send("hello");
// })


router.post('/Signup',(req,res)=>{
    const{name,email,password} = req.body;
    if (!name || !email  || !password){
        return res.status(422).json({error : "please fill the full form"})    

    }   
    User.findOne({email:email})
    .then(saveduser=>{
        if(saveduser){
            return res.status(422).json({message : "user already exists"})
        }
    bcrypt.hash(password,10)
    .then(hashed =>{
        const user = new User({
            name,
            email,
            password:hashed,
        });
         user.save()
        .then(user => res.json({message : "successfully saved"}))  //*
        .catch(err => console.log(err))
    } )
    
}).catch(err => console.log(err))

})

router.post('/Signin',(req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error : "please enter email and password"})
    }
    User.findOne({email:email})
    .then(saveduser =>{
        if(!saveduser){
            return res.status(422).json({error : "invalid email or password"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(matched =>{
            if(matched){
                // creating and sending webtoken to user by using jsonwebtoken for verification of users.
                const token = jwt.sign({_id : saveduser._id},jwt_key)
                const {_id,name,email} = saveduser
                res.json({token,user:{_id,name,email}})
                // res.json({message: "successfully signed in"})
                }else
                {
                  return res.status(422).json({error : "invalid email or password"})
                }
         }).catch(err =>{
            console.log(err)
        })
        
    })
       
})



module.exports = router
