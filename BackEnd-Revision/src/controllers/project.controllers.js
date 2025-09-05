import { createProjectService } from '../services/project.services.js'
import { API_ERROR } from '../utils/api-error.js'
const createProject = async (req, res) => {
    console.log('Entered in creation')
    const { name, description, createdBy } = req.body
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
    if (!projectId) {
        res.status(400).json({
            message: 'Error while finding the project',
            data: [],
        })
    }
}
const deleteProject = async (req, res) => {}
export { createProject, modifyProject, deleteProject }
