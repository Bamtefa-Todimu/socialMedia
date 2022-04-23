const routes = require('express')()
const {getAllUsersController,getSingleUserController,registerUserController, loginUserController,} = require('../controllers/users')

routes.get('/getAllUsers',getAllUsersController)
routes.get('/getSingleUser/:username',getSingleUserController)
routes.post('/registerUser',registerUserController)
routes.post('/loginUser',loginUserController)

module.exports = routes