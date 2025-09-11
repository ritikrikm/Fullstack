import mongoose from 'mongoose'
import Project from '../Models/project.model.js'
import User from '../Models/user.models.js'
import { API_ERROR } from '../Utils/api-error.js'
import { API_RESPONSE } from '../Utils/api-response.js'

const createProjectService = async ({ projectName, projectDesc, createdBy }) => {
    const user = await User.findById(createdBy)
    if (!user) throw new API_ERROR(404, 'UserNotFound', false)

    const existingProject = await Project.findOne({ projectName })
    if (existingProject) throw new API_ERROR(409, 'ProjectNameAlreadyExists', false)

    const newProject = await Project.create({
        projectName,
        projectDesc,
        createdBy: new mongoose.Types.ObjectId(createdBy),
    })

    return new API_RESPONSE(201, 'ProjectCreated', newProject, true)
}
const modifyProjectService = async ({ projectId, projectName, projectDesc }) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new API_ERROR(404, 'ProjectNotFound', false)
    }

    if (projectName) {
        // Check if another project with the same name exists
        const existingProject = await Project.findOne({ projectName, _id: { $ne: projectId } })
        if (existingProject) {
            throw new API_ERROR(409, 'ProjectNameAlreadyExists', false)
        }
        project.projectName = projectName
    }
    if (projectDesc) {
        project.projectDesc = projectDesc
    }

    await project.save()

    return new API_RESPONSE(200, 'ProjectModified', project, true)
}
const deleteProjectService = async ({ projectId }) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new API_ERROR(404, 'ProjectNotFound', false)
    }
    await project.deleteOne()
    return new API_RESPONSE(200, 'ProjectDeleted', null, true)
}
const getAllProjectsService = async () => {
    const projects = await Project.find().populate('createdBy', 'fullName email')
    if (!projects || projects.length === 0) {
        throw new API_ERROR(404, 'NoProjectsFound', false)
    }
    return new API_RESPONSE(200, 'ProjectsFetched', projects, true)
}
const getProjectByIdService = async ({ projectId }) => {
    const project = await Project.findById(projectId).populate('createdBy', 'fullName email')
    if (!project) throw new API_ERROR(404, 'NoProjectsFound', false)

    return new API_RESPONSE(200, 'ProjectsFetched', project, true)
}
export {
    createProjectService,
    modifyProjectService,
    deleteProjectService,
    getAllProjectsService,
    getProjectByIdService,
}
