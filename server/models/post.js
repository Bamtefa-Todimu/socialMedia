const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    authorPic:{
        type:String,
    },
    post:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    tags:[{type:Object}],
    postTime:{
        type:String
    },
    postDate:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{type:Object}]
})

module.exports = mongoose.model('Posts',postSchema)