import mongoose from 'mongoose'
import Schema from 'mongoose'
import API_ERROR from '../Utils/api-error.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { UserModelRoleValues, UserModelRole } from '../Utils/constants.js'
dotenv.config()
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
    const check = await bcrypt.compare(this.password, password)
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
userSchema.methods.generateJWToken = async function () {
    const refreshToken = await jwt.sign(
        {
            id: this._id,
            role: this._role,
        },
        process.env.SECRET,
        {
            expiresIn: process.env.R_EXPIRY,
        }
    )
    const accessToken = await jwt.sign(
        {
            id: this._id,
            role: this._role,
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
const User = mongoose.model('User', userSchema)
export default User
