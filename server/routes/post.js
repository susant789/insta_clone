const express = require("express")
const router = express.Router();
const mangoose = require("mongoose");
const Post = mangoose.model('Post')
const requirelogin = require("../middelware/requireLogin.js")


router.get("/allpost",(req,res)=>{
    Post.find()
    .populate("PostedBy","_id name")
    .then(posts =>{
        res.json({posts})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){ 
        return res.status(422).json({error : "please enter both title,body"})
    }
    
    console.log(req.user)
    // res.send("ok")
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        PostedBy:req.user,
    })
    post.save()
    .then(result => res.json({post : result}))
    .catch(err =>console.log(err))
    // console.log(post);
})

router.get("/mypost",requirelogin,(req,res)=>{
    Post.find({PostedBy : req.user._id})  //*
    .populate("PostedBy","_id name")
    .then(mypost =>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router