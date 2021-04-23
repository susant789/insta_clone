const mangoose = require("mongoose");
const {ObjectId} = mangoose.Schema.Types

const postSchema = new mangoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:"no photo"
    },
    PostedBy:{
        type:ObjectId,  //building a relations between post and user model
        ref : "User"
    }
})

mangoose.model('Post',postSchema)