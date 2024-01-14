const massageController = require('../dal/massage.controller')

//GET ALL MASSAGE
async function getAllMassage(){
    return await massageController.read()
}


//DELETE MASSAGE
async function deleteOneMassage(id){
    const exist = await massageController.readOne({_id: id})
    if(!exist) throw "No massage"
    return await massageController.delOne({_id: id})
}


// send massage
async function sendMassage(massage){
    
    return await massageController.create(massage)
}


module.exports = {
    getAllMassage,
    deleteOneMassage
}