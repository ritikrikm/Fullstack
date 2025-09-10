import User from '../models/User.models.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'
import { sendEmail } from '../validators/email.js'
const createUserService = async ({ userName, fullName, email, password }) => {
    const checkUser = await User.findOne({ email: email })
    if (checkUser) return new API_ERROR(400, 'User Already Exists')
    const checkUserName = await User.findOne({ userName: userName })
    if (checkUserName) return new API_ERROR(400, 'UserName must be unique')
    const newUser = await new User({
        userName: userName,
        fullName: fullName,
        email: email,
        password: password,
    })
    const tokenData = newUser.generateVerificationToken()
    if (!tokenData)
        return new API_ERROR(
            400,
            'User created but error in email verification'
        )
    newUser.emailVerificationToken = tokenData.unhashedToken
    newUser.emailVerificationExpiry = tokenData.tokenExpiry
    //email sending and saving the data using .save
    //link: something/hsahedToken
    const link = newUser.verificationLinkGenerator(tokenData.hashedToken)
    const emailBody = newUser.bodyGenerator(
        'creationVerification',
        newUser,
        link
    )
    await sendEmail(emailBody, newUser)

    await newUser.save()
    return new API_RESPONSE(
        200,
        {
            newUser: {
                ...newUser.toObject(),
                password: undefined,
            },
        },
        'User created',
        true
    )
}
const emailVerifyService = async ({ user, token }) => {
    const checkUser = await User.findOne({ email: user.email })
    if (!checkUser) return new API_ERROR(400, 'User do not exists')
    const dbToken = checkUser.emailVerificationToken
    const dbTokenExpiry = checkUser.emailVerificationExpiry
    if (Date.now() > dbTokenExpiry.getTime())
        return (400, 'Token has been expired')
    const tokenCheck = checkUser.verifyingToken(token, dbToken)
    if (!tokenCheck) return new API_ERROR(400, 'Token different')
    checkUser.isEmailVerified = tokenCheck
    checkUser.emailVerificationExpiry = undefined
    checkUser.emailVerificationExpiry = undefined
    await checkUser.save()
    return new API_RESPONSE(200, checkUser, 'EmailVerifiedSuccess', true)
}
const LoggedInService = async () => {}
const userLoginService = async ({ email, password }) => {
    const checkUser = await User.findOne({ email: email })
    console.log(checkUser)
    if (!checkUser) return new API_ERROR(400, 'User do not exists')
    const checkPassword = await checkUser.passwordVerification(password)
    if (!checkPassword) return new API_ERROR(400, 'Password is incorrect')
    console.log(checkPassword)

    const refreshToken = await checkUser.generateRefreshToken()
    if (!refreshToken) return new API_ERROR(400, 'Error in token')
    console.log(refreshToken)
    const accessToken = await checkUser.generateAccessToken()
    if (!accessToken) return new API_ERROR(400, 'Token Error')
    console.log(accessToken)

    checkUser.refreshToken = refreshToken

    return new API_RESPONSE(
        200,
        { checkUser, accessToken },
        'Successfully Read to logged in',
        true
    )
}
const tokenRotationService = async ({
    accessToken,
    refreshTokenCookie,
    user,
}) => {
    console.log('NOW ' + user)
    const userObject = await User.findOne({ _id: user._id })
    if (!userObject) {
        return new API_ERROR(400, 'User not found')
    }
    const checkRefreshExpiry =
        await userObject.tokenExpiryCheck(refreshTokenCookie)

    if (!checkRefreshExpiry) {
        userObject.refreshToken = undefined
        refreshTokenCookie = await userObject.generateRefreshToken()
        userObject.refreshToken = refreshTokenCookie
    }
    const newAccessToken = await userObject.generateAccessToken()

    await userObject.save()

    return new API_RESPONSE(
        200,
        {
            refreshTokenCookie: refreshTokenCookie,
            newAccessToken: newAccessToken,
        },
        'Token Created',
        true
    )
}
export {
    createUserService,
    emailVerifyService,
    userLoginService,
    tokenRotationService,
    LoggedInService,
}
