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
        type: String
    },
    roles: [{
        type: String,
        default: "User"
    }],
    confirmationCode: {
        type: String
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
    googleId: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)