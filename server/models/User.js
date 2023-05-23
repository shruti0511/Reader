const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "User"
    }],
    confirmationCode: {
        type: String,
        unique: true
    },

    active: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpiration: {
        type: Date,
        default: null,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)