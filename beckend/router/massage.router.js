const express = require("express");
const massageService = require("../services/massage.service");
const router = express.Router();

//GET ALL USER MASSAGE
//INBOX EMAIL
router.get('/to/:userEmail', async (req, res) => {
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


//DELETE MASSAGE
router.delete("/:id", async (req, res) => {
    try {
        const delMassage = await massageService.deleteOneMassageById(req.params.id);
        res.status(200).send(delMassage);
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
