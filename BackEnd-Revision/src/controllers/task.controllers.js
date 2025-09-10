import mongoose from 'mongoose'
import {
    addTaskService,
    modifyTaskService,
    deleteTaskService,
    getAllTaskService,
} from '../services/task.services.js'
import { API_ERROR } from '../utils/api-error.js'

const addTask = async (req, res) => {
    const projectId = req.params.projectId
    const projectObjectId = new mongoose.Types.ObjectId(projectId)
    const { title, description, assignedTo, status, attachments } = req.body
    const assignedBy = req.user
    const response = await addTaskService({
        title,
        description,
        assignedTo,
        status,
        attachments,
        assignedBy,
        projectObjectId,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const modifyTask = async (req, res) => {
    const taskId = req.params

    const { title, description, assignedTo, status, attachments, assignedBy } =
        req.body
    const response = await modifyTaskService({
        taskId,
        title,
        description,
        assignedTo,
        status,
        attachments,
        assignedBy,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const deleteTask = async (req, res) => {
    const taskId = req.params

    const response = await deleteTaskService({
        taskId,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const getAllTasks = async (req, res) => {
    const projectId = req.params
    console.log('ProjectId is ', projectId.projectId)
    console.log(' and Param is ', req.params)
    const response = await getAllTaskService({ projectId })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
export { addTask, modifyTask, deleteTask, getAllTasks }
