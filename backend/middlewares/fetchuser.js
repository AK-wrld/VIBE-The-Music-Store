const jwt = require('jsonwebtoken')
const JWT_Secret = 'aVerySecretSignature'
//creating the middleware fn to get data of the user
const fetchuser = (req,res,next)=> {
    // console.log(req.header)
    let token = req.header('auth-token')
    console.log(token)
    if(!token) {
        res.status(401).send({error : "Invalid Token! Please authenticate your id using a valid token"})
    }
    try {
        const data= jwt.verify(token,JWT_Secret)
        req.user = data.user
        next()
        
    } catch  {
        res.status(401).send({error : "Invalid Token! Please authenticate your id using a valid token"})
        
    }
}

module.exports = fetchuser