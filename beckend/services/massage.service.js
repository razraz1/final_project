const massageController = require('../dal/massage.controller')

//GET ALL MASSAGE
async function getAllMassagesOfUser(email){
    const myEmailHistory =  await massageController.readOne({from: email})
    if(!myEmailHistory) throw "No massage"
    return myEmailHistory
}


//DELETE MASSAGE
async function deleteOneMassageById(id){
    // const exist = await massageController.readOne({_id: id})
    // if(!exist) throw "No massage"
    return await massageController.delOne({_id: id})
}



module.exports = {
    getAllMassagesOfUser,
    deleteOneMassageById
}