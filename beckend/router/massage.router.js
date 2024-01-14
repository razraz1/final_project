const express = require('express');
const massageService = require('../services/massage.service');
const router = express.Router();


//GET ALL USER MASSAGE
//INBOX EMAIL
router.get('/:userEmail', async (req, res) => {
    try {
        const data = await massageService.getAllMyInboxEmail(req.params.userEmail)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})
//OUTBOX EMAIL
router.get('/to/:userEmail', async (req, res) => {
    try {
        const data = await massageService.getAllMyOutboxEmail(req.params.userEmail)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})


//USER PERMISSION
//VALIDATION
// async function authentication(req, res, next){
//     const {auth}= req.headers;
//     if(!auth){
//         res.status(400).send("headers not correct")
//         return
//     }
//     const [email, password] = auth.split(":")
//     if(!email || !password){
//         res.status(400).send("email or password not correct")
//         return
//     }
//     try{
//         const userEP = await massageService.getUserByEmailAndPassword(email, password)
//         if(!userEP){
//             res.status(401).send("user not exist");
//             return;
//         }
//         req.user = userEP;
//         next()
//     }
//     catch (err) {
//         res.status(500).send("server problem");
//     }
//   }
//   //DELETE PERMISSION
//   async function authorization(req, res, next){
//     if(req.params.id !== req.user.email){
//         res.status(401).send("email not mach");
//         return;
//     }
//     next()
//   }

//DELETE MASSAGE 
router.delete('/:id', async (req, res) => {
    try {
        const delMassage = await massageService.deleteOneMassageById(req.params.id)
        res.status(200).send(delMassage)
    }
    catch (err) {
        res.status(400).send(err)
    }
})




module.exports = router