import {
    createTaskService,
    modifyTaskService,
    deleteTaskService,
    getTaskByIdService,
    getAllTasksService,
} from '../Services/task.service.js'
import { API_ERROR } from '../Utils/api-error.js'
const createTask = async (req, res) => {
    const { content, assignedTo, dueDate } = req.body
    const { projectId } = req.params
    const assignedBy = req.user
    const createdBy = req.user
    const response = await createTaskService({
        content,
        assignedTo,
        assignedBy,
        dueDate,
        createdBy,
        projectId,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const modifyTask = async (req, res) => {
    const { content, assignedTo, dueDate } = req.body
    const { taskId } = req.params
    const assignedBy = req.user._id
    const response = await modifyTaskService({
        taskId,
        content,
        assignedTo,
        assignedBy,
        dueDate,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}

const deleteTask = async (req, res) => {
    const { taskId } = req.params
    const response = await deleteTaskService({ taskId })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}

const getTaskById = async (req, res) => {
    const { taskId } = req.params
    const response = await getTaskByIdService({ taskId })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}

const getAllTasks = async (req, res) => {
    const response = await getAllTasksService()
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode ?? 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(response.statusCode ?? 200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
export { createTask, modifyTask, deleteTask, getTaskById, getAllTasks }
