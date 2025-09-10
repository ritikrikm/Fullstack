import mongoose, { Mongoose } from 'mongoose'
import ProjectModel from '../models/Project.models.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'
import ProjectMember from '../models/ProjectMember.models.js'

const createProjectService = async ({ name, description, createdBy, role }) => {
    const isProject = await ProjectModel.findOne({ name: name })
    if (isProject) return new API_ERROR(400, 'Project Already Exists')
    const newProject = await ProjectModel.create({
        name,
        description,
        createdBy,
        projectMembers: [createdBy],
    })
    const addMember = await new ProjectMember({
        user: new mongoose.Types.ObjectId(createdBy),
        project: newProject._id,
    })
    await addMember.save()
    return new API_RESPONSE(200, newProject, 'Project has been created', true)
}
const getAllProjectsService = async () => {
    const isProject = await ProjectModel.find()
    if (!isProject) return new API_ERROR(400, 'No Projects yet')
    return new API_RESPONSE(200, { isProject }, 'Here you go', true)
}
const getAllProjectByIdService = async ({ createdById }) => {
    createdById = new mongoose.Types.ObjectId(createdById)
    const isProject = await ProjectModel.find({ createdBy: createdById })
    if (!isProject) return new API_ERROR(400, 'No Projects yet')
    return new API_RESPONSE(200, { isProject }, 'Here you go', true)
}
const modifyProjectService = async ({ name, description, projectId }) => {
    projectId = projectId.projectId
    const isProject = await ProjectModel.findById(projectId)
    if (!isProject) return new API_ERROR(400, 'Project not found')
    const project = await ProjectModel.findByIdAndUpdate(
        projectId,
        {
            $set: { name: name, description: description },
        },
        { new: true }
    )
    return new API_RESPONSE(200, project, 'Project has been modified', true)
}
const deleteProjectService = async ({ projectId }) => {
    projectId = projectId.projectId
    const isProject = await ProjectModel.findById(projectId)
    if (!isProject) return new API_ERROR(400, 'Project not found')
    const project = await ProjectModel.findByIdAndDelete(projectId)
    return new API_RESPONSE(200, project, 'Project has been deleted', true)
}
export {
    createProjectService,
    getAllProjectsService,
    getAllProjectByIdService,
    modifyProjectService,
    deleteProjectService,
}
