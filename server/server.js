const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnection = require('./dbConnection')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const verifyUser = require('./middleware/jwtVerify')
const user = require('./models/user')
// const proxy = require('http-proxy-middleware');

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

 app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// app.use(proxy('/api', {
//         target: 'http://www.api.com',
//         logLevel: 'debug',
//         changeOrigin: true
//     }));

app.use('/api/v1',userRoutes)
app.use('/api/v1',postRoutes)


app.post('/api/v1/verifyUser',verifyUser,async (req,res) => {
    console.log(req.userId)
    if(!req.userId)
    {
        res.json({message:"unauthorized bro"})
    }

    else 
    {
        const findUser = await user.findById(req.userId.id)
        res.json(findUser)
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    dbConnection()
    console.log(`server is listening on port ${PORT}`)
})