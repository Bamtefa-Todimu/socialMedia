const routes = require('express')()

const {uploadPostController,getPostsController} = require('../controllers/posts')

routes.get('/getAllPosts',getPostsController)
routes.post('/uploadPost',uploadPostController)


module.exports = routes