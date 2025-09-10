import e from 'express'
import { userLoggedIn } from '../middlewares/auth.middlewares.js'
import {
    addTask,
    modifyTask,
    deleteTask,
    getAllTasks,
} from '../controllers/task.controllers.js'
import { asyncHandler } from '../utils/async-handler.js'
const taskRouter = e.Router()
taskRouter.get('/addTask/:projectId', userLoggedIn, asyncHandler(addTask))
taskRouter.post('/modifyTask/:taskId', userLoggedIn, asyncHandler(modifyTask))
taskRouter.get(
    '/getAllTasks/:projectId',
    userLoggedIn,
    asyncHandler(getAllTasks)
)
taskRouter.post('/deleteTask/:taskId', userLoggedIn, asyncHandler(deleteTask))

export default taskRouter
