// const userController = require('../dal/user.controller')


const userModel = require('../dal/user.model')


//SHOW ALL
async function read() {
    return await userModel.find({ isActive: true })
}


async function getAllUser(){
    return await read()
}


async function updateUser (){

}





module.exports = {
    getAllUser
}