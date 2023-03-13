const express=require("express")
const productRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { ProductModel } = require("../model/product.model")
const { authorize } = require("../middleware/authorize.middleware")
const { authenticate } = require("../middleware/authenticate.middleware")



productRouter.post("/addproducts",authorize, async(req,res)=>{
   const product=new ProductModel(req.body)
   await product.save()
   res.send("product created successfully")

})

productRouter.get("/products",authenticate, async(req,res)=>{
    const product=new ProductModel.findOne()
    res.send(product)
    
 })

 productRouter.delete("/deleteproducts/:id",authorize, async(req,res)=>{
    const product=await ProductModel.findById(req.params.id)
    if(!product){
        return res.status(404).json({"msg":"product not found"})


    }
    if(req.user.email!=product.seller){
        return res.status(404).json({"msg":"unauthorized"})
        
    }
    await product.remove
    res.json({"msg":"product deleted"})
    
  
 
 })
 




module.exports={
    productRouter
}