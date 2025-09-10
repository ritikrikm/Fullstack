import { Router } from 'express'
import { userLoggedIn } from '../middlewares/auth.middlewares.js'
import {
    userRegister,
    userLogin,
    tokenRotation,
    emailVerify,
} from '../controllers/user.controllers.js'
import { validationEngine } from '../validators/validatorEngine.validators.js'
import { authValidator, loginValidator } from '../validators/validator.js'

import { asyncHandler } from '../utils/async-handler.js'

const userRouter = Router()

userRouter.post(
    '/register',
    authValidator(),
    validationEngine,
    asyncHandler(userRegister)
)

userRouter.get('/login', loginValidator(), validationEngine, userLogin)

userRouter.post('/refresh', userLoggedIn, asyncHandler(tokenRotation))
userRouter.get('/verify/:token', asyncHandler(emailVerify))

export default userRouter
