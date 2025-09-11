import { API_ERROR } from '../Utils/api-error.js'
import {
    userRegisterService,
    verifyEmailService,
    userLoginService,
    tokenRotationService,
} from '../Services/user.service.js'
const userRegister = async (req, res) => {
    const { fullName, email, password } = req.body
    const response = await userRegisterService({ fullName, email, password })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const userVerify = async (req, res) => {
    const { email } = req.body
    const { hashedToken } = req.params
    const response = await verifyEmailService({ hashedToken, email })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const userLogin = async (req, res) => {
    const { email, password } = req.body

    const response = await userLoginService({ email, password })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.cookie('refresh', response.data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.setHeader('Authorization', `Bearer ${response.data?.accessToken}`)
    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const tokenRotation = async (req, res) => {
    const refreshToken = req.cookies?.refresh
    const header = req.headers?.authorization
    const accessToken = header && header.startsWith('Bearer ') ? header.slice(7).trim() : undefined
    const userId = req.user?._id
    console.log('USER IS ' + req.user._id)
    if (!refreshToken || !accessToken || !userId) {
        return res.status(401).json({
            message: 'TokenOrUserNotAvailable',
            success: false,
        })
    }
    const response = await tokenRotationService({ refreshToken, accessToken, userId })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }
    if (response.message === 'TokenGenerated') {
        res.cookie('refresh', response.data?.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })
        res.setHeader('Authorization', `Bearer ${response.data?.accessToken}`)
        return res.status(response.statusCode ?? 200).json({
            message: response.message,
            data: response.data,
            success: response.isSuccess,
        })
    } else if (response.message === 'TokenNotExpiredButVerified') {
        return res.status(response.statusCode ?? 200).json({
            message: response.message,
            data: response.data,
            success: response.isSuccess,
        })
    }
    res.status(400).json({
        message: 'Error in rotating',
        success: false,
    })
}
export { userRegister, userVerify, userLogin, tokenRotation }
