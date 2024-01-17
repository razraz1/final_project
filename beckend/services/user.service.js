const userController = require("../dal/user.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//LOGIN
async function validateUser(user) {
  let errors = [];
  if (!user.email) errors.push("invalid email");
  if (!user.password) errors.push("invalid password");
  return errors;
}

async function authenticateUser(user) {
  const logedUser = await getUserByEmail(user.email);
  const match = await bcrypt.compare(user.password, logedUser.password);
  console.log(match);
  if (!match) throw "user is not exist";

 const token = jwt.sign({id: logedUser. _id} ,process.env.TOKEN_SECRET)
 return token
}


async function authentication(req, res, next){
  const auth =  req.headers.authorization;
  if (!auth)
      throw "error"
    const token = auth.split(" ")[1];
    if (!token)
    throw "error"
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  const user = await userController.readOne({_id: decoded.id})
  req.user = user
  next()
}




//SHOW ALL USERS
async function getAllUser() {
  return await userController.read();
}

//SHOW ONE BY EMAIL
async function getUserByEmail(email) {
  const userEmail = await userController.readOne({ email: email });
  if (!userEmail) throw "User not exist";
  return userEmail;
}

//SHOW ONE BY EMAIL AND PASSWORD
async function getUserByEmailAndPassword(email, password) {
  const userN = await userController.readOne({
    email: email,
    password: password,
  });
  return userN;
}

//UPDATE USER
async function updateUser(id, data) {
  const exist = await userController.readOne({ _id: id });
  if (!exist) throw "User not exist";

  let dataOfUserToUpdate = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    profilePic: data.profilePic,
  };
  await userController.update({ _id: id }, dataOfUserToUpdate);

  return await userController.readOne({ _id: id });
}

//DELETE USER
async function deleteUser(id) {
  const exist = await userController.readOne({ _id: id });
  if (!exist) throw "User not exist";
  return await userController.delOne({ _id: id });
}

async function addUser(user) {
  const exist = await userController.readOne(user);
  if (exist) throw "User is exist already";

  let errorList = await areFieldsFull(user);
  errorList = errorList.concat(await detailsValidation(user));
  if (errorList.length) throw errorList;

  const hashed = await bcrypt.hash(user.password, 10);

  let newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashed,
    profilePic: user.profilePic,
  };

   const NewUser = await userController.create(newUser);

   const token = jwt.sign({id: newUser. _id} ,process.env.TOKEN_SECRET)
   return [NewUser ,token]
}

async function areFieldsFull(user) {
  let errors = [];
  if (!user.firstName) errors.push("missing firstName");
  if (!user.lastName) errors.push("missing lastName");
  if (!user.email) errors.push("missing email");
  if (!user.password) errors.push("missing password");

  return errors;
}

async function detailsValidation(user) {
  let errors = [];
  if (typeof user.firstName !== "string" || user.firstName.length < 2)
    errors.push("invalid firstName");
  if (typeof user.lastName !== "string" || user.lastName.length < 2)
    errors.push("invalid lastName");
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  if (!regex.test(user.password)) errors.push("invalid password");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) errors.push("invalid email");
  return errors;
}

module.exports = {
  getAllUser,
  addUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserByEmailAndPassword,
  validateUser,
  authenticateUser,
  authentication
};
