const express = require('express');
const massageService = require('../services/massage.service');
const router = express.Router();


//GET ALL USER MASSAGE
router.get('/:userEmail', async (req, res) => {
    try {
        const data = await massageService.getAllMassagesOfUser(req.params.userEmail)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

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