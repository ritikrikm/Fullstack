import { API_ERROR } from '../Utils/api-error.js'
import {
    createProjectService,
    modifyProjectService,
    deleteProjectService,
    getAllProjectsService,
    getProjectByIdService,
} from '../Services/project.service.js'

const createProject = async (req, res) => {
    const { projectName, projectDesc } = req.body
    const createdBy = req.user._id
    const response = await createProjectService({ projectName, projectDesc, createdBy })
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
const modifyProject = async (req, res) => {
    const { projectId } = req.params
    const { projectName, projectDesc } = req.body
    const response = await modifyProjectService({ projectId, projectName, projectDesc })
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

const deleteProject = async (req, res) => {
    const { projectId } = req.params
    const response = await deleteProjectService({ projectId })
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
const getAllProject = async (req, res) => {
    const response = await getAllProjectsService()
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
const getProjectById = async (req, res) => {
    const { projectId } = req.params
    const response = await getProjectByIdService({ projectId })
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
export { createProject, modifyProject, deleteProject, getAllProject, getProjectById }
