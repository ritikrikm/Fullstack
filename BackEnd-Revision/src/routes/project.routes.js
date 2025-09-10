import express from 'express'
import {
    createProject,
    modifyProject,
    deleteProject,
    getAllProjects,
    getAllProjectById,
} from '../controllers/project.controllers.js'
import { validationEngine } from '../validators/validatorEngine.validators.js'
import {
    userLoggedIn,
    projectPermission,
} from '../middlewares/auth.middlewares.js'
import {
    createProjectValidator,
    modifyProjectValidator,
    deleteProjectValidator,
} from '../validators/validator.js'
import { asyncHandler } from '../utils/async-handler.js'
import { UserModelRole } from '../utils/constants.js'

const projectRouter = express.Router()

projectRouter.post(
    '/createProject',
    createProjectValidator(),
    validationEngine,
    asyncHandler(userLoggedIn),
    asyncHandler(createProject)
)
projectRouter.post(
    '/modifyProject/:projectId',
    modifyProjectValidator(),
    validationEngine,
    asyncHandler(userLoggedIn),
    asyncHandler(
        projectPermission([UserModelRole.ADMIN, UserModelRole.MEMBER])
    ),
    asyncHandler(modifyProject)
)
projectRouter.get(
    '/getAllProjects',
    asyncHandler(userLoggedIn),
    asyncHandler(getAllProjects)
)
projectRouter.post(
    '/deleteProject/:projectId',
    deleteProjectValidator(),
    validationEngine,
    asyncHandler(userLoggedIn),
    asyncHandler(
        projectPermission([UserModelRole.ADMIN, UserModelRole.MEMBER])
    ),
    asyncHandler(deleteProject)
)
projectRouter.get(
    '/getAllProjects/',
    asyncHandler(userLoggedIn),
    asyncHandler(
        projectPermission([UserModelRole.ADMIN, UserModelRole.MEMBER])
    ),
    asyncHandler(getAllProjects)
)
projectRouter.get(
    '/getAllProjects/:createdById',
    asyncHandler(userLoggedIn),
    asyncHandler(
        projectPermission([
            UserModelRole.ADMIN,
            UserModelRole.MEMBER,
            UserModelRole.OWNER,
        ])
    ),
    asyncHandler(getAllProjectById)
)

export default projectRouter
