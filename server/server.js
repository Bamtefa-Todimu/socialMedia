const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const io = socketIo(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    maxHttpBufferSize: 1000000
  }
});

const axios = require('axios')
const bodyParser = require('body-parser')
const dbConnection = require('./dbConnection')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const messagesRoutes = require('./routes/messages')
const verifyUser = require('./middleware/jwtVerify')
const user = require('./models/user');
const { response } = require('./routes/users');
// const proxy = require('http-proxy-middleware');

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

app.use('/api/v1',userRoutes)
app.use('/api/v1',postRoutes)
app.use('/api/v1',messagesRoutes)



io.on('connection', (socket) => {
    console.log(socket.id + "just connected")

    socket.on('user-connected',async (username) => {
        await socket.join(username)
        console.log(username + "joined room")
    })


    socket.on('sent-message',async (sender,recipient,message,messageTime) => {
        try
        {

            const res = await axios.post('http://localhost:5000/api/v1/uploadMessage',{sender,recipient,message,messageTime})
            io.to([recipient,sender]).emit('rcv-message',{sender,recipient,message,messageTime})
            // io.to(sender).emit('rcv-message',{sender,recipient,message,messageTime})
        }
        catch(e)
        {
            console.log("just err");
        }
    })

    socket.on('disconnect',() => {
        console.log(socket.id + "disconneted at " + Date.now())
    })
})


app.post('/api/v1/verifyUser',verifyUser,async (req,res) => {
    // console.log(req.userId)
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

server.listen(PORT,() => {
    dbConnection()
    console.log(`server is listening on port ${PORT}`)
})