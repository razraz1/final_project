const express = require("express");
const massageService = require("../services/massage.service");
const router = express.Router();

//GET ALL USER MASSAGE
router.get('/search/:userEmail', async (req, res) => {
    console.log(req.params.userEmail, req.query.text);
    try {
        const data = await massageService.searchEmails(req.params.userEmail, req.query.text)
        res.send(data)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

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
router.get('/from/:userEmail', async (req, res) => {
    try {
        const data = await massageService.getAllMyOutboxEmail(req.params.userEmail)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//READ MASSAGE
router.put('/reading/:userEmail/:id', async (req, res) => {
    try {
        const readMassage = await massageService.alreadyReadMassage(req.params.userEmail, req.params.id)
        res.status(204).send(readMassage)
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

//DELETE MASSAGE
router.delete("/del/:userEmail/:id", async (req, res) => {
    try {
        const delMassage = await massageService.deleteOneMassageById(req.params.userEmail, req.params.id);
        res.status(204).send(delMassage);
    } catch (err) {
        res.status(400).send(err);
    }
});

//TRASH EMAIL
router.get("/trashMail/:userEmail", async (req, res) => {
    try {
        const massages = await massageService.getTrashMail(
            req.params.userEmail
        );
        res.send(massages);
    } catch {
        res.status(500).send("Internal Server Error");
    }
});


//SEND MASSAGE
router.post("/:userEmail", async (req, res) => {
    try {
        const newMassage = await massageService.sendMassage(req.body);
        res.send(newMassage);
    } catch (err) {
        res.status(400).send(err);
    }
});




module.exports = router;
