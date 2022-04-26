const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    fullname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://mybroadband.co.za/news/wp-content/uploads/2017/04/Twitter-profile-picture.jpg"
    },
    Bio:{
        type:String
    },
    Website:{
        type:String
    },
    followers:[{type:String}],
    following:[{type:String}],
    saved:[{type:Object}]
})

module.exports = mongoose.model('Users',userSchema)