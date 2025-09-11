import { Router } from 'express'
import {
    createTask,
    modifyTask,
    deleteTask,
    getTaskById,
    getAllTasks,
} from '../Controllers/task.controller.js'
import expressAsyncHandler from 'express-async-handler'
import { validatorEngine } from '../Middlewares/validate.middleware.js'
import { createTaskValidator, modifyTaskValidator } from '../Utils/validators.js'
import { isLoggedIn } from '../Middlewares/auth.middleware.js'
const taskRoute = Router()

taskRoute.post(
    '/createTask/:projectId',
    validatorEngine(createTaskValidator),
    isLoggedIn,
    expressAsyncHandler(createTask)
)
taskRoute.put(
    '/modifyTask/:taskId',
    validatorEngine(modifyTaskValidator),
    isLoggedIn,
    expressAsyncHandler(modifyTask)
)
taskRoute.delete('/deleteTask/:taskId', isLoggedIn, expressAsyncHandler(deleteTask))
taskRoute.get('/getAll', isLoggedIn, expressAsyncHandler(getAllTasks))
taskRoute.get('/getTask/:taskId', isLoggedIn, expressAsyncHandler(getTaskById))
export default taskRoute
