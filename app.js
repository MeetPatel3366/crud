const express=require('express')
const app=express()

const connectToDB=require("./config/db.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectToDB()

const userRoutes=require("./routes/userRoutes.js")

app.use('/',userRoutes)
module.exports=app