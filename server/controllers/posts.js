const posts = require('../models/post')

exports.uploadPostController = async(req,res) => {
    console.log(req.body)

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
    console.log(req.body)
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