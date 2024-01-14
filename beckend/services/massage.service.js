const massageController = require('../dal/massage.controller')

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
async function deleteOneMassageById(id){
    // const exist = await massageController.readOne({_id: id})
    // if(!exist) throw "No massage"
    return await massageController.delOne({_id: id})
}


// send massage
async function sendMassage(massage){
    
    return await massageController.create(massage)
}


module.exports = {
    getAllMyInboxEmail,
    getAllMyOutboxEmail,
    deleteOneMassageById,
    getUserByEmailAndPassword
}