const routes = require('express')()

const {uploadMessagesController,getMessagesController} = require('../controllers/messages')

routes.post('/getAllMessages',getMessagesController)
routes.post('/uploadMessage',uploadMessagesController)

module.exports = routes