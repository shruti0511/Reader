const User = require("../models/User");
const bcrypt = require('bcrypt')

const userSeed = async () => {
    const isAdmin = await User.findOne({ roles: { $in: ["Admin"] } }).exec();
    if (!isAdmin) {
        console.log("not admin");
        const name = "Admin";
        const email = "admin@gmail.com";
        const roles = ["Admin"];
        const password = "admin@123";

        const hasedPwd = await bcrypt.hash(password, 10);
        const userObj = {
            name,
            "password": hasedPwd,
            email,
            roles,
            active: true,
            confirmationCode:null
        };
        const user = User.create(userObj)
        if (user) { //created
            console.log('Admin User scessfully created');
        } else {
           console.log('Invalid User data received');
        }
    }
};

module.exports = userSeed;
