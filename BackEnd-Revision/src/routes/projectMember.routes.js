import e from 'express'

import { validationEngine } from '../validators/validatorEngine.validators.js'
import {
    addMemberValidator,
    removeMemberValidator,
} from '../validators/validator.js'
import { userLoggedIn } from '../middlewares/auth.middlewares.js'
import { asyncHandler } from '../utils/async-handler.js'
import {
    addMembers,
    removeMember,
    getAllMember,
} from '../controllers/projectMembers.controllers.js'

const memberRouter = e.Router()

memberRouter.post(
    '/addMember/:projectId',
    addMemberValidator(),
    validationEngine,
    userLoggedIn,
    asyncHandler(addMembers)
)
memberRouter.get(
    '/removeMember/:projectId',
    removeMemberValidator(),
    validationEngine,
    userLoggedIn,
    asyncHandler(removeMember)
)
memberRouter.get(
    '/getAllMember/:projectId',

    userLoggedIn,
    asyncHandler(getAllMember)
)

export default memberRouter
