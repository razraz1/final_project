const express = require("express");
const massageService = require("../services/massage.service");
const router = express.Router();

//GET ALL USER MASSAGE
router.get("/:userEmail", async (req, res) => {
  try {
    const data = await massageService.getAllMassagesOfUser(
      req.params.userEmail
    );
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

//trash mail
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

//DELETE MASSAGE
router.delete("/:id", async (req, res) => {
  try {
    const delMassage = await massageService.deleteOneMassageById(req.params.id);
    res.status(200).send(delMassage);
  } catch (err) {
    res.status(400).send(err);
  }
});

//send massage
router.post("/:userEmail", async (req, res) => {
  try {
    const newMassage = await massageService.sendMassage(req.body);
    res.send(newMassage);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
