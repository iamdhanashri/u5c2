const jwt=require("jsonwebtoken")

require("dotenv").config()


const authenticate=(req,res,next)=>{
    const authheader=req.headers.authorization
    const token=authheader && authheader.split(" ")[1]
    if(!token){
      return res.status(401).json({"msg":"unauthorized"})  
    }
    jwt.verify(token,"secretKey",(err,user)=>{
        if(err){
      return res.status(401).json({"msg":"unauthorized"})  
            
        }
        req.user=user
        next()

    })
}

module.exports={
    authenticate
}