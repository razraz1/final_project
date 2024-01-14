const express = require('express')
const app = express()
require('dotenv').config();

const db = require('./dal/db')
db.connect()

app.use(express.json())
const cors = require('cors') 
app.use(cors())


const userRouter = require('./router/user.router')
app.use('/users', userRouter)

const massageRouter = require('./router/massage.router');
app.use('/massages', massageRouter)


app.listen(3000 , ()=>{
    console.log('*** server is UP ***\nPort: 3000');
})