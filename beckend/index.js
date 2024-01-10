const express = require('express')
const app = express()

const db = require('./dal/db')
db.connect()

app.use(express.json())
const cors = require('cors') 
app.use(cors())


const userRouter = require('./router/user.router')
app.use('/users', userRouter)


app.listen(3000 , ()=>{
    console.log('*** server is UP ***\nPort: 3000');
})

