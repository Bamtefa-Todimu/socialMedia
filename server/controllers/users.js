const user = require('../models/user')
const jwt = require('jsonwebtoken')

exports.getAllUsersController = async(req,res) => {
    try
    {
        const allUsers = await user.find({})
        res.json(allUsers)    
    }
    catch(e)
    {
        console.log(e)
        res.json({message:"error with fetching users from db"})
    }
}

exports.loginUserController = async(req,res) => {

    
    try
    {
        const loginUser = await user.findOne(req.body)
        if(loginUser)
        {
            const token = jwt.sign({id:loginUser._id},process.env.SECRET,{expiresIn:"24h"})
            return res.json({...loginUser.toObject(),token:token})   
        }
        return res.json({message:"user doesn't exist"})
    }
    catch(e)
    {
        console.log(e)
        res.json({message:"error with finding users from db"})
    }
}

exports.registerUserController = async(req,res) => {
    try
    {
        const registerUser = await user.create(req.body)
        const registeredUser = await registerUser.save()
        res.json(registeredUser)    
    }
    catch(e)
    {
        console.log(e)
        res.json({message:"error with registering user to db"})
    }
}

