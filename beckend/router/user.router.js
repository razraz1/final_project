const express = require("express");
const userServes = require("../services/user.service");
const router = express.Router();

router.all("*", (req, res, next) => {
  console.log("All request go passes here");
  next();
});

router.get("/", async (req, res) => {
  const data = await userServes.getAllUser();
  res.send(data);
});

//GET USER BY EMAIL
router.get("/:userEmail", async (req, res) => {
  try {
    const data = await userServes.getUserByEmail(req.params.userEmail);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.stack);
  }
});

//UPDATE USER
router.put("/:userEmail", async (req, res) => {
  try {
    const updateMe = await userServes.updateUser(
      req.params.userEmail,
      req.body
    );
    res.send(updateMe);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

//USER PERMISSION
//VALIDATION
async function authentication(req, res, next) {
  const { auth } = req.headers;
  if (!auth) {
    res.status(400).send("headers not correct");
    return;
  }
  const [email, password] = auth.split(":");
  if (!email || !password) {
    res.status(400).send("email or password not correct");
    return;
  }
  try {
    const userEP = await userServes.getUserByEmailAndPassword(email, password);
    if (!userEP) {
      res.status(401).send("user not exist");
      return;
    }
    req.user = userEP;
    next();
  } catch (err) {
    res.status(500).send("server problem");
  }
}
//DELETE PERMISSION
async function authorization(req, res, next) {
  if (req.params.userEmail !== req.user.email) {
    res.status(401).send("email not mach");
    return;
  }
  next();
}

//DELETE USER
router.delete(
  "/:userEmail",
  authentication,
  authorization,
  async (req, res) => {
    console.log(req.params);
    try {
      const delUser = await userServes.deleteUser(req.params.userEmail);
      res.status(200).send(delUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

//ADD NEW USER
router.post("/", async (req, res) => {
  try {
    const user = await userServes.addUser(req.body);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
