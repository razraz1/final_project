const express = require('express')
const userServes = require('../services/user.service')
const router = express.Router()

router.all('*', (req, res, next) => {
    console.log("All request go passes here");
    next()
})

router.get('/', async (req, res) => {
    const data = await userServes.getAllUser()
    res.send(data)
})


//GET USER BY EMAIL
router.get('/:userEmail', async (req, res) => {
    try {
        const data = await userServes.getUserByEmail(req.params.userEmail)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err.stack)
    }
})


//UPDATE USER
router.put('/update/:userEmail', async (req, res) => {
    try {
        const updateMe = await userServes.updateUser(req.params.userEmail, req.body)
        res.send(updateMe)
    }
    catch (err) {
        res.status(400).send(err)
        console.log(err);
    }
})


//ADD NEW USER
router.post('/', async (req, res)=>{
    try{
        const addNew = await userServes.addNewUser(req.body)
        res.send(addNew)
    }
    catch(err){
        res.status(400).send(err)
    }
})






module.exports = router
