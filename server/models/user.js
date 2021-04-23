const mangoose = require("mongoose");

const userSchema = new mangoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

mangoose.model('User',userSchema)