const massageController = require("../dal/massage.controller");

//GET ALL MASSAGE


async function getAllMyInboxEmail(email){
    const myEmailHistory =  await massageController.read({from: email})
    if(!myEmailHistory) throw "No massage"
    return myEmailHistory

}
async function getAllMyOutboxEmail(email){
    const myEmailHistory =  await massageController.read({to: email})
    if(!myEmailHistory) throw "No out massage"
    return myEmailHistory
}


//SHOW ONE BY EMAIL OR PASSWORD
async function getUserByEmailAndPassword(email, password) {
    const userN = await userController.readOne({ email: email, password: password })
    return userN
}

//DELETE MASSAGE
async function deleteOneMassageById(id) {
  // const exist = await massageController.readOne({_id: id})
  // if(!exist) throw "No massage"
  return await massageController.delOne({ _id: id });
}


//TRASH EMAIL
async function getTrashMail(userEmail){
    return await massageController.readTrash({ to: userEmail })
}

//SEND MASSAGE
async function sendMassage(massage) {
  let errorList = await areFieldsFull(massage);
  errorList = errorList.concat(await detailsValidation(massage));
  if (errorList.length) throw errorList;

  return await massageController.create(massage);
}

async function areFieldsFull(massage) {
  let errors = [];
  if (!massage.to) errors.push("No recipient");
  if (!massage.massageBody) errors.push("Empty massage");
  return errors;
}

async function detailsValidation(massage) {
  let errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(massage.to)) errors.push("invalid email");
  return errors;
}

module.exports = {
    getAllMyInboxEmail,
    getAllMyOutboxEmail,
    deleteOneMassageById,
    getTrashMail,
    sendMassage,
    getUserByEmailAndPassword
}
