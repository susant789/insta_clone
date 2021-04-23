// 7T34961ZuYpG7qlx
const port = 5000;
const express = require("express")
const app = express();
const mangoose = require("mongoose");
const { mongouri } = require("./keys");

    
mangoose.connect(mongouri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// app.get('/',(req,res)=>{
//     res.send("hello")
// })


mangoose.connection.on("connected",()=>{
    console.log("connected to mango ")
})
mangoose.connection.on("error",(err)=>{
    console.log("error occured",err)
})


require("./models/user.js")
require("./models/post.js")

app.use(express.json())
app.use(require("./routes/auths"))
app.use(require("./routes/post.js"))


app.listen(port,()=>{
    console.log('server started',port)
})

    