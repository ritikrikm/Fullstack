import { Router } from 'express'
import {
    userRegister,
    userVerify,
    userLogin,
    tokenRotation,
} from '../Controllers/user.controller.js'
import {
    userRegisterValidator,
    userLoginValidator,
    userVerifyValidator,
} from '../Utils/validators.js'
import { validatorEngine } from '../Middlewares/validate.middleware.js'
import expressAsyncHandler from 'express-async-handler'
import { isLoggedIn } from '../Middlewares/auth.middleware.js'

const userRoute = Router()
userRoute.post(
    '/register',
    validatorEngine(userRegisterValidator),
    expressAsyncHandler(userRegister)
)
userRoute.post('/login', validatorEngine(userLoginValidator), expressAsyncHandler(userLogin))
userRoute.get(
    '/verifyEmail/:hashedToken',
    validatorEngine(userVerifyValidator),
    expressAsyncHandler(userVerify)
)
userRoute.get('/tokenRefresh', isLoggedIn, expressAsyncHandler(tokenRotation))
export default userRoute
