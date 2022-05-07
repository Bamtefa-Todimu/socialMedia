const mongoose = require('mongoose')


const messageSchema = mongoose.Schema({
    sentBy:{
        type:String,
        required:true
    },
    sentTo:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    messageTime:{
        type:String,
    },
    
})

module.exports = mongoose.model('Messages',messageSchema)