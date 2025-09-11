import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { API_ERROR } from '../Utils/api-error.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { UserModelRoleValues, UserModelRole } from '../Utils/constants.js'
dotenv.config({ path: '../.env' })
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: UserModelRoleValues,
            default: UserModelRole.MEMBER,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
        refreshToken: {
            type: String,
        },
        apiKey: {
            type: String,
        },
    },
    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
userSchema.methods.checkPassword = async function (password) {
    if (!password) throw new API_ERROR(400, 'Password is required')
    const check = await bcrypt.compare(password, this.password)
    return check
}
userSchema.methods.generateToken = async function () {
    const unhashedToken = await crypto.randomBytes(32).toString('hex')

    const hashedToken = await crypto.createHash('sha1').update(unhashedToken).digest('hex')
    const expiry = Date.now() + 20 * 60 * 1000
    return { hashedToken, unhashedToken, expiry }
}
userSchema.methods.checkEmailToken = async function (hashedToken) {
    if (!hashedToken) throw new API_ERROR(400, 'TokenCheckingError')
    if (!this.emailVerificationExpiry || this.emailVerificationExpiry.getTime() < Date.now())
        return false
    const hashedDBtoken = crypto
        .createHash('sha1')
        .update(this.emailVerificationToken)
        .digest('hex')
    if (hashedDBtoken !== hashedToken) return false
    return true
}
userSchema.methods.tokenRotationCheck = async function (refreshToken, accessToken) {
    try {
        const decoded = await jwt.verify(refreshToken, process.env.SECRET)

        return { success: true, decoded }
    } catch (error) {
        // if(error.name==='TokenExpiredError'){

        // }

        return { success: false, error }
    }
}
userSchema.methods.generateJWToken = async function () {
    const refreshToken = await jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.SECRET,
        {
            expiresIn: process.env.R_EXPIRY,
        }
    )
    const accessToken = await jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.SECRET,
        {
            expiresIn: process.env.A_EXPIRY,
        }
    )

    return { refreshToken, accessToken }
}
userSchema.methods.generateAPIKey = async function () {
    const apiKey = await crypto.createHash('sha1').update(process.env.API_PASSWORD).digest('hex')

    return apiKey
}
userSchema.methods.linkGenerator = async function (token) {
    const link = `http://localhost:8080/protected/user/verifyEmail/${token}`
    return link
}
userSchema.methods.emailBodyGenerator = async function (context) {
    let email
    switch (context.type) {
        case 'CreationVerify':
            email = {
                body: {
                    name: context.name || 'User',
                    intro: "Welcome to DevBoard! We're very excited to have you on board.",
                    action: {
                        instructions:
                            'To get started, please confirm your account by clicking the button below:',
                        button: {
                            color: '#22BC66',
                            text: 'Confirm your account',
                            link: context.verifyLink,
                        },
                    },
                    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
                },
            }
            break
        case 'ResendVerify':
            email = {
                body: {
                    name: context.name || 'User',
                    intro: 'It looks like you requested a new verification email.',
                    action: {
                        instructions: 'Please confirm your account by clicking the button below:',
                        button: {
                            color: '#22BC66',
                            text: 'Verify your email',
                            link: context.verifyLink,
                        },
                    },
                    outro: 'If you did not request this, you can safely ignore this email.',
                },
            }
            break
        default:
            throw new Error('Invalid email context type')
    }
    return email
}
const User = mongoose.model('User', userSchema)
export default User
