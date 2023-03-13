const express=require("express")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")
const jwt=require("jsonwebtoken")
const blacklist=[];
require("dotenv").config()






userRouter.post("/signup",async(req,res)=>{
    const {email,pass,role}=req.body
    try{
    let user = await UserModel.findOne({email})
    if(user){
        return res.status(401).json({"msg":"user already exist"})
    }
    bcrypt.hash(pass,5,async(err,hash)=>{
    if(err){
        res.send("user registration failed")
    }else{
        const user=new UserModel({email,pass:hash,role})
        await user.save()
        res.send("user register successfully")
    }
    
    })
    }
    catch(err){
 console.log(err.message)
    }
})




userRouter.post("/login",async(req,res)=>{
    // const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({"msg":"wrong email"})

        }
        const validPass=await bcrypt.compare(req.body.pass,user.pass)
        if(!validPass){
            return res.status(401).json({"msg":"wrong email"})

        }
        const token=jwt.sign({email:user.email,role:user.role},"secretKey",{expiresIn:"1m"})

        const refreshToken=jwt.sign({email:user.email},"secretKey",{expiresIn:"5m"})

        res.json({token,refreshToken})


    }
    catch(err){
 res.status(500).json({"msg":err.message})
    }
})


// logout


userRouter.post("/logout",async(req,res)=>{
    const token=req.body.token
    const refreshToken=req.body.refreshToken
 try{
blacklist.push(token)
blacklist.push(refreshToken)
res.status(201).json({"msg":"succcessfully logout"})


 }
 catch(err){
    res.status(500).json({"msg":err.message})

 }
})


module.exports={
    userRouter
}