const routes = require('express')()

const {uploadPostController,getSinglePostController,getPostsController,updateLikesController,updateCommentsController} = require('../controllers/posts')

routes.get('/getAllPosts',getPostsController)
routes.get('/getSinglePost/:id',getSinglePostController)

routes.post('/uploadPost',uploadPostController)
routes.post('/updateLikes/:id',updateLikesController)
routes.post('/updateComments/:id',updateCommentsController)


module.exports = routes