const mongoose = require('mongoose')

const massageSchema = new mongoose.Schema({
    from: {
        type: String,
        require: true
    },
    to: {
        type:[String],
        require: true
    },
    title:{
        type: String,
        require: true
    },
    massageBody: {
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        require: true,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const massageModel = mongoose.model('massage', massageSchema)
module.exports = massageModel
