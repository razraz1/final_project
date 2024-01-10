const mongoose = require('mongoose')

const URL_MONGO = "mongodb+srv://raziel:1234@cluster0.8bz3lxr.mongodb.net/EmailUsers?retryWrites=true&w=majority"

const connect = ()=>{
    mongoose.connect(URL_MONGO)
    .then(_=> console.log("connection to DB - success"))
    .catch(err => {
        console.err("DB connect error: ", err);
        throw err
    })
}

module.exports = {connect}