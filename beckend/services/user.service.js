const userController = require('../dal/user.controller')
// const { emit } = require('../dal/user.model')


//SHOW ALL USERS
async function getAllUser() {
    return await userController.read()
}


//SHOW ONE BY EMAIL
async function getUserByEmail(email) {
    const userEmail = await userController.readOne({ email:email })
    if (!userEmail) throw "User not exist"
    return userEmail
}


//SHOW ONE BY EMAIL OR PASSWORD
async function getUserByEmailAndPassword(email, password) {
    const userN = await userController.readOne({ email: email, password: password })
    return userN
}


//UPDATE USER
async function updateUser(userEmail, data) {
    const exist = await userController.readOne({ email: userEmail })
    if (!exist) throw "User not exist"

    let dataOfUserToUpdate = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        profilePic: data.profilePic
    }
    await userController.update({ email: userEmail }, dataOfUserToUpdate)

    return await userController.readOne({ email: userEmail })
}



//DELETE USER
async function deleteUser(email){
    const exist = await userController.readOne({email: email})
    if(!exist) throw "User not exist"
    return await userController.delOne({email: email})
}

// //USER PERMISSION

// //VALIDATION
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
//         const userEP = await getUserByEmailAndPassword(email, password)
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
// }
// //DELETE PERMISSION
// async function authorization(req, res, next){
//     if(req.params.userEmail !== req.user.email){
//         res.status(401).send("id not mach");
//         return;
//     }
//     next()
// }


async function addUser(user) {
  const exist = await userController.readOne(user);
  if (exist) throw "User is exist already";

  let errorList = await areFieldsFull(user);
  errorList = errorList.concat(await detailsValidation(user)) 
  if (errorList.length) throw errorList;

  let newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    profilePic: user.profilePic
  }
  
  return await userController.create(newUser);
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
  return errors
}

module.exports = {
    getAllUser,
    addUser,
    getUserByEmail,
    updateUser,
    deleteUser,
    getUserByEmailAndPassword
    // authentication,
    // authorization
}
