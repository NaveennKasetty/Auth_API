const bodyParser = require('body-parser');
const express = require('express');
const adminRouter = require('./routes/admin');
const userRouter =require('./routes/user');
const dotenv  = require("dotenv")

const app = express();
dotenv.config()

app.use(bodyParser.json())
app.use('/admin',adminRouter)
app.use('/user',userRouter)

const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>console.log(`server Running on ${PORT}`))

