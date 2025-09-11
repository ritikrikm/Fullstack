import { Router } from 'express'
import {
    createProject,
    modifyProject,
    deleteProject,
    getAllProject,
    getProjectById,
} from '../Controllers/project.controller.js'
import { createProjectValidator, modifyProjectValidator } from '../Utils/validators.js'
import { validatorEngine } from '../Middlewares/validate.middleware.js'
import expressAsyncHandler from 'express-async-handler'
import { isLoggedIn } from '../Middlewares/auth.middleware.js'
import { validatePermission } from '../Middlewares/auth.middleware.js'
import { UserModelRole } from '../Utils/constants.js'
const projectRoute = Router()

projectRoute.post(
    '/createProject',
    validatorEngine(createProjectValidator),
    isLoggedIn,
    validatePermission([UserModelRole.ADMIN, UserModelRole.OWNER]),
    expressAsyncHandler(createProject)
)

projectRoute.put(
    '/modifyProject/:projectId',
    validatorEngine(modifyProjectValidator),
    isLoggedIn,
    validatePermission([UserModelRole.ADMIN, UserModelRole.OWNER]),
    expressAsyncHandler(modifyProject)
)

projectRoute.delete(
    '/deleteProject/:projectId',
    isLoggedIn,
    validatePermission([UserModelRole.ADMIN, UserModelRole.OWNER]),
    expressAsyncHandler(deleteProject)
)

projectRoute.get(
    '/getAllProjects',
    isLoggedIn,
    validatePermission([UserModelRole.ADMIN, UserModelRole.OWNER, UserModelRole.MEMBER]),
    expressAsyncHandler(getAllProject)
)

projectRoute.get(
    '/get/:projectId',
    isLoggedIn,
    validatePermission([UserModelRole.ADMIN, UserModelRole.OWNER, UserModelRole.MEMBER]),
    expressAsyncHandler(getProjectById)
)
export default projectRoute
