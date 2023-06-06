const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const nodemailer = require("../config/nodemailer.config");
const googleOAuth = require('../utils/googleOAuth');

// @desc SignUp
// @route POST /signup
// @access Public
const signup = asyncHandler(async (req, res) => {
    const { name, password, email } = req.body;

    //confirm data
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    //check for duplicates
    const duplicate = await User.findOne({
        email,
    })
        .lean()
        .exec();
    if (duplicate) {
        return res.status(409).json({
            message: "Email Id already exist",
        });
    }

    //hash password
    const hasedPwd = await bcrypt.hash(password, 10); //salt rounds
    const confirmationToken = jwt.sign(
        {
            UserInfo: {
                name: name,
                email: email,
                roles: ["User"],
            },
        },
        process.env.CONFIRMATION_SECRET,
        { expiresIn: "1d" }
    );
    const userObject = {
        name,
        password: hasedPwd,
        email,
        roles: ["User"],
        confirmationCode: confirmationToken,
    };

    //create and store user
    const user = User.create(userObject);
    nodemailer.sendConfirmationEmail(name, email, confirmationToken);
    if (user) {
        //created
        res.status(200).json({
            message: "User was Registered. Check your Email for confirmation.",
        });
    } else {
        res.status(400).json({
            message: "Invalid User data received",
        });
    }
});

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
        {
            UserInfo: {
                name: foundUser.name,
                email: foundUser.email,
                roles: foundUser.roles,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "None", //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.status(200).json({ token: accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" });

            const foundUser = await User.findOne({ email: decoded.email }).exec();

            if (!foundUser) return res.status(401).json({ message: "User not found." });

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        name: foundUser.name,
                        email: foundUser.email,
                        roles: foundUser.roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.json({ accessToken });
        })
    );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
};

// @desc Confirm account
// @route POST /auth/confirm
// @access Public - confirm email of user and to set user active
const confirmationEmail = async (req, res) => {
    const { email, confirmationCode } = req.body;
    const getUSer = await User.findOne({ email: email }).exec();
    if (!getUSer) {
        return res.status(401).json({ message: `Email not found` })
    }
    if (getUSer.active) {
        return res.json({ message: `${getUSer.name}'s Email already Confirmed` })
    }
    jwt.verify(
        confirmationCode,
        process.env.CONFIRMATION_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Confirmation link expired" });

            const foundUser = await User.findOne({ email: decoded.UserInfo.email }).exec();

            if (!foundUser) return res.status(401).json({ message: "Email not found" });

            if (foundUser.email !== email) {
                return res.status(401).json({ message: "Wrong Email Id" });
            }
            foundUser.active = true
            const updatedUser = await foundUser.save();
            res.json({ message: `${updatedUser.name}'s Email Confirmed` })
        })
    );

};

// @desc resend email
// @route POST /auth/reSendEmail
// @access Public - re-send email confirmation link (for expired links)
const reSendEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    if (user.active == true) {
        return res.status(401).json({ message: "User email already confirmed" });
    }
    const confirmationToken = jwt.sign(
        {
            UserInfo: {
                name: user.name,
                email: email,
                roles: user.roles,
            },
        },
        process.env.CONFIRMATION_SECRET,
        { expiresIn: "15m" }
    );
    user.confirmationCode = confirmationToken;
    const updatedUser = await user.save();
    nodemailer.sendConfirmationEmail(user.name, email, confirmationToken);
    if (updatedUser) {
        //created
        res.status(200).json({
            message: "Check your Email for confirmation.",
        });
    } else {
        res.status(400).json({
            message: "Invalid User data received",
        });
    }

}

// @desc forgot password
// @route POST /auth/forgotPasword
// @access Public - to send reset password link to user email for password changing
const forgotPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return res.status(401).json({ message: 'User not Found' });
    }
    const resetPasswordToken = jwt.sign({ email: user.email }, process.env.CONFIRMATION_SECRET, { expiresIn: '1m' });
    user.resetToken = resetPasswordToken;
    user.resetTokenExpiration = Date.now() + 1 * 60 * 1000
    user.save().then((result) => {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Change Password for MyApp",
            html: `<h2>Reset Password.</h2>
                  <p>A Password change has been requested for your account. If this was you, please use the link below to reset your password.</p>
                  <p><a href="http://localhost:3000/authentication/reset/${resetPasswordToken}">click here</a></p>`,
        };
        nodemailer.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(200).json({ message: "Email sent successfully to reset Password" });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' })
    })



}

// @desc reset password
// @route POST /auth/resetPasword
// @access Public - to change user password using reset password link
const resetPassword = async (req, res) => {
    // console.log('reset');
    // return res.json({message:'reset'})
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
        res.status(401).json({ error: "Password and confirm PAssword not match" });
    }
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
            bcrypt
                .hash(password, 10)
                .then((hashedPassword) => {
                    user.password = hashedPassword;
                    user.resetToken = null;
                    user.resetTokenExpiration = null;
                    user.save().then(() => {
                        res.status(200).json({ message: "Password updated successfully" });
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: "Internal server error" });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });

}
const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;
        const profile = await googleOAuth.getProfileInfo(code);

        const userData = {
            googleId: profile.sub,
            name: profile.name,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            profilePic: profile.picture,
        };
        User.findOne({ googleId: userData.googleId }).then(user => {
            if (user) {
                // Create JWT payload
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            name: user.name,
                            email: user.email,
                            roles: user.roles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );

                const refreshToken = jwt.sign(
                    { email: user.email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "1d" }
                );

                // Create secure cookie with refresh token
                res.cookie("jwt", refreshToken, {
                    httpOnly: true, //accessible only by web server
                    secure: true, //https
                    sameSite: "None", //cross-site cookie
                    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
                });
                res.status(200).json({ token: accessToken });
            } else {
                const newUser = new User({
                    googleId: userData.googleId,
                    name:userData.name,
                    email: userData.email,
                    roles: ["User"],
                    active:true

                });

                newUser
                    .save()
                    .then(user => {
                        // Create JWT payload
                        const accessToken = jwt.sign(
                            {
                                UserInfo: {
                                    name: user.name,
                                    email: user.email,
                                    roles: user.roles,
                                },
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: "15m" }
                        );

                        const refreshToken = jwt.sign(
                            { email: user.email },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: "1d" }
                        );

                        // Create secure cookie with refresh token
                        res.cookie("jwt", refreshToken, {
                            httpOnly: true, //accessible only by web server
                            secure: true, //https
                            sameSite: "None", //cross-site cookie
                            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
                        });
                        res.status(200).json({ token: accessToken });
                    })
                    .catch(err => console.log(err));
            }
        });

    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
}


module.exports = {
    signup,
    login,
    refresh,
    logout,
    confirmationEmail,
    reSendEmail,
    forgotPassword,
    resetPassword,
    googleLogin
};
