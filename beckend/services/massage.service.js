const massageController = require("../dal/massage.controller");
const massageModel = require("../dal/massage.model");

//GET ALL MASSAGE
async function getAllMyInboxEmail(email) {
    const myEmailHistory = await massageController.read({
        to: email, isActive: {
            $elemMatch: { to: email, active: true }
        }
    })
    console.log(myEmailHistory);
    if (!myEmailHistory) throw "No massage"
    return { "MY INBOX": myEmailHistory }
}

async function getAllMyOutboxEmail(email) {
    const myEmailHistory = await massageController.read({ from: email, fromIsActive: true })
    if (!myEmailHistory || myEmailHistory.length === 0) throw "No out massage"
    return { "MY OUTBOX": myEmailHistory }
}


//SEARCH
async function searchEmails(userEmail, text) {
    return await massageController.searchEmail(userEmail, text)
}


//READ MASSAGE
async function alreadyReadMassage(userEmail, id) {
    console.log(id);
    const exist = await massageController.readOne({ _id: id })
    if (!exist) throw "No massage to read";
    if (exist.to.includes(userEmail)) {
        const update = {
            $set: { 'status.$[elementKey].isRead': true }
        }
        const condition = {
            arrayFilters: [{ 'elementKey.to': userEmail }],
            new: true
        }
        await massageController.readMassage({ _id: id }, update, condition);
        return "Message marked as read for user: " + userEmail;
    } else {
        throw "User does not have permission to mark this message as read";
    }
}

// //SHOW ONE BY EMAIL OR PASSWORD
// async function getUserByEmailAndPassword(email, password) {
//     const userN = await userController.readOne({ email: email, password: password })
//     return userN
// }



//DELETE MASSAGE
async function deleteOneMassageById(userEmail, id) {
    const exist = await massageController.readOne({ _id: id })
    if (!exist) throw "No massage to delete";
    if (exist.to.includes(userEmail)) {
        const update = {
            $set: { 'isActive.$[elementKey].active': false }
        }
        const condition = {
            arrayFilters: [{ 'elementKey.to': userEmail }],
            new: false
        }
        await massageController.delOne({ _id: id }, update, condition);
        return "Massage delete" + userEmail
    }
    else {
        throw "No permission"
    }
}

async function onlyTheSenderDelete(userEmail, id) {
    const exist = await massageController.readOne({ _id: id })
    if (!exist) throw "No massage to delete";
    return await massageController.delOneForSender({ _id: id, from: userEmail })
}

//TRASH EMAIL
async function getTrashMail(userEmail) {
    console.log(userEmail);
    return await massageController.readTrash({
        $or: [
            {
                to: userEmail, isActive: {
                    $elemMatch: { to: userEmail, active: false }
                }
            },
            { from: userEmail, fromIsActive: false }
        ]
    })
}

//SEND MASSAGE
async function sendMassage(massage) {
    let errorList = await areFieldsFull(massage);
    errorList = errorList.concat(await detailsValidation(massage));
    if (errorList.length) throw errorList;

    const notExist = [];
    const exist = []

    for(let recipient of massage.to){
        const existUser = await checkUserByEmail(recipient)
        if(existUser){
            exist.push(recipient)
        }else{
            notExist.push(recipient)
        }
    }
    if(exist.length === 0){
        return {
            message:"Message not sent to anyone because they not exist:",
            notExistUser: notExist
        }
    }
    
    const newMassageInstance = new massageModel({
        from: massage.from,
        to: exist,
        title: massage.title,
        massageBody: massage.massageBody,
    });
    
    const savedMassage = await newMassageInstance.save();
    if(notExist.length > 0){
        return {
            message:`Message sent to existing users: ${exist}` ,
            notExistUser: notExist
        }
    }

    return savedMassage
    // return await massageController.create(massage);
}

async function areFieldsFull(massage) {
    let errors = [];
    if (!massage.to || massage.to.length === 0) errors.push("No recipient");
    if (!massage.massageBody) errors.push("Empty massage");
    return errors;
}

async function detailsValidation(massage) {
    let errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (massage.to && Array.isArray(massage.to)) {
        const isInvalidEmail = massage.to.some(email => !emailRegex.test(email));
        if (isInvalidEmail) errors.push("Invalid email");
    }
    return errors;
}

//SHOW ONE BY EMAIL 
async function checkUserByEmail(email) {
    const check = await massageController.readOneUser({ email: email })
    console.log(check);
    return !!check
  }


module.exports = {
    getAllMyInboxEmail,
    getAllMyOutboxEmail,
    deleteOneMassageById,
    getTrashMail,
    sendMassage,
    onlyTheSenderDelete,
    searchEmails,
    alreadyReadMassage
}
