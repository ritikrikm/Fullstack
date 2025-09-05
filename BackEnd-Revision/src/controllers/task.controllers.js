import addTaskService from '../services/task.services.js'

const addTask = async (req, res) => {
    const projectId = req.params
    if (!projectId) {
        res.status(400).json({
            message: 'Error while finding the project',
            data: {},
        })
    }
    const { title, description, assignedTo, status, attachments } = req.body
    const assignedBy = req.user
    const response = await addTaskService({
        title,
        description,
        assignedTo,
        status,
        attachments,
        assignedBy,
    })
    if (!response) {
        return res.status(400).json({
            message: 'Error while finding the project',
            data: {},
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
    })
}
const modifyTask = async (req, res) => {}
const deleteTask = async (req, res) => {}
export { addTask, modifyTask, deleteTask }
