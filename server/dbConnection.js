const mongoose = require('mongoose')
require('dotenv/config')

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then( resp => console.log("connected to database..."))
    .catch( err => console.log(err))
}