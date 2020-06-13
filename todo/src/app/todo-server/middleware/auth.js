const jwt=require('jsonwebtoken')


module.exports=(req,res,next)=>{
    
    try {
        console.log(req.headers.authorization)
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token,"Secret_Token_Is_Generated")
        console.log(jwt.verify(token,"Secret_Token_Is_Generated"))
        next()
    } catch (error) {
        console.log("error")
        res.send(error)
    }
    
}