import mongoose from 'mongoose'
import {
    createProjectService,
    getAllProjectsService,
    getAllProjectByIdService,
    modifyProjectService,
    deleteProjectService,
} from '../services/project.services.js'
import { API_ERROR } from '../utils/api-error.js'
const createProject = async (req, res) => {
    console.log('Entered in creation')
    const { name, description } = req.body
    const createdBy = req.user._id

    // const user = req.user
    const response = await createProjectService({
        name,
        description,
        createdBy,
    })
    console.log(response)
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.success,
        })
    }
    res.status(200).json({
        message: response.message,
        data: response.data,
    })
    console.log('Project has been created with response ', response)
}
const modifyProject = async (req, res) => {
    const projectId = req.params
    const { name, description } = req.body
    const response = await modifyProjectService({
        name,
        description,
        projectId,
    })
    console.log(response)
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.success,
        })
    }
    res.status(200).json({
        message: response.message,
        data: response.data,
    })
}
const deleteProject = async (req, res) => {
    const projectId = req.params
    const response = await deleteProjectService({ projectId })
    if (response instanceof API_ERROR) {
        return res.send(response.statusCode || 400).json({
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

const getAllProjects = async (req, res) => {
    const response = await getAllProjectsService()
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.success,
        })
    }
    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const getAllProjectById = async (req, res) => {
    const createdById = req.params
    const response = await getAllProjectByIdService({ createdById })
    if (response instanceof API_ERROR) {
        return res.send(response.statusCode || 400).json({
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
export {
    createProject,
    modifyProject,
    deleteProject,
    getAllProjects,
    getAllProjectById,
}
