const jwt = require('jsonwebtoken')
require('dotenv/config')


const verifyToken = async(req,res,next) => {
    const userToken = req.headers["x-access-token"]
    if(userToken)
    {
        try
        {
            const verify = jwt.verify(userToken,process.env.SECRET)
            console.log(verify)
            req.userId = verify
        }
        catch(e)
        {
            console.log(e)
        }
    }

    next()
}

module.exports = verifyToken