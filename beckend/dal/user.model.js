const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    }, 
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
// mongodb+srv://raziel:<password>@cluster0.8bz3lxr.mongodb.net/?retryWrites=true&w=majority

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

// mongodb+srv://raziel:<password>@cluster0.8bz3lxr.mongodb.net/