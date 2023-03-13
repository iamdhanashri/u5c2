const mongoose=require("mongoose")

require("dotenv").config()

// const connection=mongoose.connect(process.env.mongoUrl)
const connection=mongoose.connect("mongodb+srv://dhanashri:ahire@cluster0.1t4wpeq.mongodb.net/u5c2?retryWrites=true&w=majority")


module.exports={
    connection
}