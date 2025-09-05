import TaskModel from '../models/Task.models'
const addTaskService = async ({
    title,
    description,
    assignedTo,
    status,
    attachments,
    assignedBy,
}) => {
    if (
        !title ||
        !description ||
        !assignedTo ||
        typeof assignedTo !== 'object' ||
        !status ||
        !attachments ||
        typeof assignedBy !== 'object' ||
        !assignedBy
    ) {
        res.status(400).json({
            message: 'Error while finding the fields for creating task',
            data: [],
        })
    }
    const assignedBy = ''
    try {
        await TaskModel.create({
            title,
            description,
            assignedTo,
            status,
            attachments,
            assignedBy,
        })
        return {
            message: 'Task Created',
            data: {
                title,
                description,
                assignedTo,
                status,
                attachments,
                assignedBy,
            },
        }
    } catch (error) {
        console.log('Error while creating tasks', error)
        return {
            message: 'Error while creating task',
            data: {},
        }
    }
}
export default addTaskService
