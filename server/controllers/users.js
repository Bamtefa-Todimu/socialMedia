const user = require('../models/user')
const post = require('../models/post')
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
exports.getSingleUserController = async(req,res) => {
    // console.log(req.params)
    try
    {
        const allUsers = await user.findOne({username:req.params.username})
        // console.log(allUsers)
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


exports.followUserController = async(req,res) => {
    // console.log(req.body);

    try{
        const updateFollowers = await user.findOneAndUpdate({username:req.params.username},
            { $push: { followers: req.body.username } }
        )
        const updateFollowing = await user.findOneAndUpdate({username:req.body.username},
            { $push: { following: req.params.username } }
        )

        

        res.json(updateFollowers)
    }
    catch(e)
    {
        console.log(e);
    }
}
exports.unFollowUserController = async(req,res) => {
    // console.log(req.body);

    try{
        const updateUnFollowers = await user.findOneAndUpdate({username:req.params.username},
            { $pull: {followers: req.body.username }}
        )
        const updateUnFollowing = await user.findOneAndUpdate({username:req.body.username},
            { $pull: { following: req.params.username } }
        )

        res.json(updateUnFollowers)
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.updateProfileController = async(req,res) => {
    try
    {
        const updatedUser = await user.findOneAndUpdate({username:req.params.username},req.body)
        res.json(updatedUser)
    }
    catch(e)
    {
        console.log(e)
    }
}


