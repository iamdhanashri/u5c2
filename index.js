
const express = require("express")

const { connection } = require("./config/db")
const { productRouter } = require("./routes/product.route")
const { userRouter } = require("./routes/user.route")

require("dotenv").config()


const app = express()

app.use(express.json())


app.get("/", (req, res) => {
    res.send("homepage")
})

app.use("/user", userRouter)

app.use("/product", productRouter)


app.listen(8080, async () => {
    try {
        await connection
        console.log(`connected to db `)
    }
    catch (err) {
        console.log(err)
    }
    console.log(`listening at port 8080`)
})

