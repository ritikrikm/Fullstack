import express, { Router } from 'express'
import { userLoggedIn } from '../middlewares/auth.middlewares.js'
import {
    userRegister,
    userLogin,
    LoggedIn,
} from '../controllers/user.controllers.js'
import { validationEngine } from '../validators/validatorEngine.validators.js'
import {
    authValidator,
    loginValidator,
    addMemberValidator,
    removeMemberValidator,
    createProjectValidator,
} from '../validators/validator.js'
import {
    addMembers,
    removeMember,
} from '../controllers/projectMembers.controllers.js'
import { createProject } from '../controllers/project.controllers.js'
import { asyncHandler } from '../utils/async-handler.js'
const userRouter = Router()

userRouter.post(
    '/register',
    authValidator(),
    validationEngine,
    asyncHandler(userRegister)
)
userRouter.get('/me', LoggedIn)
// router.route('/register').post(userLoggedIn , userRegister)]
userRouter.get('/login', loginValidator(), validationEngine, userLogin)
userRouter.post(
    '/createProject',
    createProjectValidator(),
    validationEngine,
    userLoggedIn,
    asyncHandler(createProject)
)
userRouter.post(
    '/addMember/:projectId',
    addMemberValidator(),
    validationEngine,
    userLoggedIn,
    asyncHandler(addMembers)
)
userRouter.get(
    '/removeMember/:projectId',
    removeMemberValidator(),
    validationEngine,
    userLoggedIn,
    asyncHandler(removeMember)
)
export default userRouter
