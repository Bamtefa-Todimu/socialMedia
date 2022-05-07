const messages = require('../models/messages')


exports.getMessagesController = async(req,res) => {
    console.log(req.body)
    const {sender,recipient} = req.body
    try{
        const allMessages = await messages.find({$or:[{sentBy:sender,sentTo:recipient},{sentBy:recipient,sentTo:sender}]})
        res.json(allMessages)
    }
    catch(e)
    {
        console.log(e)
    }
}

exports.uploadMessagesController = async(req,res) => {
    console.log(req.body)
    const {sender,recipient,message,messageTime} = req.body
    try{
        const allMessages = await messages.create({sentBy:sender,sentTo:recipient,message:message,messageTime:messageTime})
        const savedMessages = allMessages.save()
        res.json(savedMessages)
    }
    catch(e)
    {
        console.log(e)
    }
}