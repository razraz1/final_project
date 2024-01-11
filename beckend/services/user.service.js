const userController = require("../dal/user.controller");

async function getAllUser() {
  return await userController.read();
}



async function addUser(user) {
  const exist = await userController.readOne(user);
  if (exist) throw "user is exist";

  let errorList = await areFieldsFull(user);
  errorList = errorList.concat(await detailsValidation(user)) 
  if (errorList.length) throw errorList;

  let newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
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
};
