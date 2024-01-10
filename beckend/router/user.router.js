const express = require('express')
const userServes = require('../services/user.service')
const router = express.Router()

router.all('*', (req, res, next) => {
    console.log("All request go passes here");
    next()
})

router.get('/', async (req, res)=>{
    const data = await userServes.getAllUser()
    res.send(data)
})


module.exports = router
