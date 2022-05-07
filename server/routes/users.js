const routes = require('express')()
const {getAllUsersController,getSingleUserController,registerUserController, loginUserController,followUserController,unFollowUserController,updateProfileController} = require('../controllers/users')

routes.get('/getAllUsers',getAllUsersController)
routes.get('/getSingleUser/:username',getSingleUserController)
routes.post('/registerUser',registerUserController)
routes.post('/loginUser',loginUserController)
routes.post('/followUser/:username',followUserController)
routes.post('/unfollowUser/:username',unFollowUserController)
routes.post('/updateUser/:username',updateProfileController)

module.exports = routes