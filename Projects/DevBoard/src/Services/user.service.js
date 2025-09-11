import User from '../Models/user.models.js'
import { API_ERROR } from '../Utils/api-error.js'
import { API_RESPONSE } from '../Utils/api-response.js'
import startEmail from '../Utils/email.js'
const userRegisterService = async ({ fullName, email, password }) => {
    const findUser = await User.findOne({ email: email })
    if (findUser) throw new API_ERROR(400, 'User already present')
    const newUser = await new User({
        fullName: fullName,
        email: email,
        password,
    })
    const tokens = await newUser.generateToken()
    const link = await newUser.linkGenerator(tokens.hashedToken)
    console.log('link is ' + link)
    const context = {
        name: fullName,
        email: email,
        verifyLink: link,
        type: 'CreationVerify',
    }
    const emailBody = await newUser.emailBodyGenerator(context)
    newUser.emailVerificationToken = tokens.unhashedToken
    newUser.emailVerificationExpiry = tokens.expiry
    try {
        await startEmail(newUser, emailBody)
    } catch (error) {
        throw new API_ERROR(400, 'Couldnt send email')
    }

    await newUser.save()
    return new API_RESPONSE(200, 'UserCreated', newUser, true)
}
const verifyEmailService = async ({ hashedToken, email }) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new API_ERROR(404, 'User not found')

    const isTokenValid = await user.checkEmailToken(hashedToken)
    if (!isTokenValid) throw new API_ERROR(400, 'Invalid or expired token')

    user.isVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    await user.save()

    return new API_RESPONSE(200, 'Email verified successfully', user, true)
}
const userLoginService = async ({ email, password }) => {
    const checkUser = await User.findOne({ email: email })
    if (!checkUser) throw new API_ERROR(400, 'UserNotFound')
    const check = await checkUser.checkPassword(password)
    if (!check) throw new API_ERROR(400, 'Password Incorrect')
    if (checkUser.isVerified === false) throw new API_ERROR(400, 'EmailNotVerified')
    const JWtoken = await checkUser.generateJWToken()
    checkUser.refreshToken = JWtoken.refreshToken
    await checkUser.save()
    return new API_RESPONSE(
        200,
        'ReadyToLogin',
        { ...checkUser.toObject(), accessToken: JWtoken.accessToken },
        true
    )
}
const tokenRotationService = async ({ refreshToken, accessToken, userId }) => {
    const checkUser = await User.findById(userId)
    if (!checkUser) throw new API_ERROR(400, 'UserNotFound')
    const context = await checkUser.tokenRotationCheck(refreshToken, accessToken)
    if (!context.success || context.error?.name === 'TokenExpiredCheck') {
        checkUser.refreshToken = undefined
        const tokens = await checkUser.generateJWToken()
        checkUser.refreshToken = tokens.refreshToken
        await checkUser.save()
        return new API_RESPONSE(200, 'TokenGenerated', tokens, true)
    }
    return new API_RESPONSE(
        200,
        'TokenNotExpiredButVerified',
        { ...checkUser.toObject(), refreshToken, accessToken },
        true
    )
}
export { userRegisterService, userLoginService, verifyEmailService, tokenRotationService }
