import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { UserModelRole, UserModelRoleValues } from '../utils/constants.js'
const { Schema } = mongoose
const userSchema = new Schema(
    {
        avatar: {
            type: {
                URL: String,
                mimeT: String,
            },
        },
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: UserModelRoleValues,
            default: UserModelRole.MEMBER,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)
userSchema.methods.bodyGenerator = function (context, newUser, link) {
    switch (context) {
        case 'creationVerification':
            var intro =
                "Welcome to Ritik Project! We're very excited to have you on board."
            var instructions = 'To get started with me, please click here:'
            var text = 'Confirm your account'
            var endlink = link
        case 'resendVerification':
            var intro =
                'Welcome to Ritik Project! you have requested for an email verification'
            var instructions =
                'To complete the verification, please click here:'
            var text = 'Confirm your account'
            var endlink = link
    }
    var email = {
        body: {
            name: newUser.fullName,
            intro: intro,
            action: {
                instructions: instructions,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: text,
                    link: endlink,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
    return email
}
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
userSchema.methods.verificationLinkGenerator = function (hashedToken) {
    const link = `http://localhost:8080/user/verify/${hashedToken}`
    return link
}
userSchema.methods.verifyingToken = function (hashedToken, unhashedDBToken) {
    const hashedDBToken = crypto
        .createHash('sha1')
        .update(unhashedDBToken)
        .digest('hex')
    if (hashedDBToken !== hashedToken) return false
    return true
}
userSchema.methods.tokenExpiryCheck = function (refreshTokenCookie) {
    try {
        jwt.verify(refreshTokenCookie, process.env.SECRET_KEY) //it automatially check the expiry aas well

        if (this.refreshToken !== refreshTokenCookie) {
            throw new Error('Token is invalid or has been used')
        }
        return true
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return false
        } else {
            console.error('error while checking expiry of token', error)
        }
    }
}
userSchema.methods.generateVerificationToken = function () {
    const unhashedToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash('sha1')
        .update(unhashedToken)
        .digest('hex')
    const tokenExpiry = Date.now() + 20 * 60 * 1000 //20mins
    return {
        unhashedToken,
        hashedToken,
        tokenExpiry,
    }
}
userSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign(
        {
            _id: this._id,
            role: this.role,
            email: this.email,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_EXP,
        }
    )

    return refreshToken
}
userSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign(
        {
            _id: this._id,
            role: this.role,
            email: this.email,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_EXP,
        }
    )
    return accessToken
}
userSchema.methods.passwordVerification = async function (password) {
    if (!this.password) return Error('Password not avalaible')
    const check = await bcrypt.compare(password, this.password)
    return check
}

const User = mongoose.model('User', userSchema)

export default User
