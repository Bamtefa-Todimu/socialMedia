const posts = require('../models/post')

exports.uploadPostController = async(req,res) => {
    // console.log(req.body)

    try
    {
        const uploadedPost = await posts.create(req.body)
        const savedPost = await uploadedPost.save()
        res.json(savedPost)
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.getPostsController = async(req,res) => {
    // console.log(req.body)
    try
    {
        const retrievedPosts = await posts.find().sort({postTime:-1})
        res.json(retrievedPosts)
    }
    catch(e)
    {
        console.log(e);
    }
}
exports.getSinglePostController = async(req,res) => {
    // console.log(req.body)
    try
    {
        const retrievedPosts = await posts.findById(req.params.id)
        res.json(retrievedPosts)
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.updateLikesController = async(req,res) => {
    try
    {

        if(req.body.action === 1)
        {
        const retrievedPosts = await posts.findOneAndUpdate({_id:req.params.id},{ $push: { likes: req.body.username } })
        console.log(retrievedPosts)
        res.json(retrievedPosts)
        }
        else if(req.body.action === -1)
        {
            const retrievedPosts = await posts.findOneAndUpdate({_id:req.params.id},{ $pull: { likes: req.body.username } })
        console.log(retrievedPosts)
        res.json(retrievedPosts)
        }
    
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.updateCommentsController = async(req,res) => {
    try
    {
        const retrievedPosts = await posts.findOneAndUpdate({_id:req.params.id},{comments:req.body.comments})
        console.log(retrievedPosts)
        res.json(retrievedPosts)
    }
    catch(e)
    {
        console.log(e);
    }
}