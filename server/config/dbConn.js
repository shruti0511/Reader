const mongoose = require('mongoose');
const userSeed = require('../utils/utils');

const connDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            userSeed()
            console.log('yeah');
          })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connDB;