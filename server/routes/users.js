const routes = require('express')()
const {getAllUsersController,registerUserController, loginUserController,} = require('../controllers/users')

routes.get('/getAllUsers',getAllUsersController)
routes.post('/registerUser',registerUserController)
routes.post('/loginUser',loginUserController)

module.exports = routes