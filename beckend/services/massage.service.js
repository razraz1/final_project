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


//DELETE MASSAGE
async function deleteOneMassageById(id){
    // const exist = await massageController.readOne({_id: id})
    // if(!exist) throw "No massage"
    return await massageController.delOne({_id: id})
}



module.exports = {
    getAllMyInboxEmail,
    getAllMyOutboxEmail,
    deleteOneMassageById
}