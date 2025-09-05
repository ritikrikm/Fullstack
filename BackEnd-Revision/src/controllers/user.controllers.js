import {
    createUserService,
    userLoginService,
    emailVerifyService,
    tokenRotationService,
} from '../services/user.services.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'
import cookieParser from 'cookie-parser'
const userRegister = async (req, res) => {
    const { userName, fullName, email, password } = req.body

    const response = await createUserService({
        userName,
        fullName,
        email,
        password,
    })
    console.log('response is ', response)

    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            success: false,
            message: response.message || 'An error occurred',
        })
    }

    res.status(200).json(response)
}
const emailVerify = async (req, res) => {
    const { email } = req.body
    const { token } = req.params

    const response = await emailVerifyService({ email, token })
    console.log(response)
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.success,
        })
    }
    res.status(200).json({
        message: response.message,
        data: response.checkUser,
        success: response.success,
    })
}
const userLogin = async (req, res) => {
    const { email, password } = req.body
    // const authHeader = res.headers['Authorization']
    // if (!authHeader.startsWith('Bearer '))
    //     res.status(400).json('Error in headers')

    const response = await userLoginService({ email, password })
    console.log(response)
    console.log(' going to set header')
    res.header('Authorization', `Bearer ${response.data?.accessToken}`)
    console.log(' going to set refresh')
    // Make sure you are using res.cookie (not res.cookies), and that cookie-parser middleware is used in your app.
    // Also, set options like httpOnly for security.
    res.cookie('refresh', response.data?.checkUser?.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        // You can set maxAge or expires as needed
    })

    await response.data.checkUser.save()
    console.log(' sent')
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.success,
        })
    }
    res.status(200).json({
        message: response.message,
        data: response.data,
    })
}
const tokenRotation = async (req, res) => {
    // let refreshToken = req.headers['Authorization']
    // const user = req.user
    // if (!refreshToken.startsWith('Bearer '))
    //     return new API_ERROR(400, 'Token is not present in header')
    // refreshToken = refreshToken.slice(7)
    const refreshTokenCookie = req.cookies['refresh']
    if (!refreshTokenCookie)
        return new API_ERROR(401, 'refreshCookieNotPresent')

    const response = await tokenRotationService({
        refreshTokenCookie,
        user,
    })
}
const LoggedIn = async (req, res) => {
    const response = await LoggedInService()
}

export { userRegister, emailVerify, userLogin, tokenRotation, LoggedIn }
