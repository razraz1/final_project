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





module.exports = {
    getAllUser,
    getUserByEmail,
    updateUser,
}