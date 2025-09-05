import ProjectModel from '../models/Project.models.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'

const createProjectService = async ({ name, description, createdBy }) => {
    const isProject = await ProjectModel.findOne({ name: name })
    if (isProject) return new API_ERROR(400, 'Project Already Exists')
    const newProject = await ProjectModel.create({
        name,
        description,
        createdBy,
        projectMembers: [createdBy],
    })
    return new API_RESPONSE(200, newProject, 'Project has been created', true)
}
export { createProjectService }
