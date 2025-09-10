import mongoose from 'mongoose'
import TaskModel from '../models/Task.models.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'
import { taskModelStatus } from '../utils/constants.js'
import ProjectModel from '../models/Project.models.js'
const addTaskService = async ({
    title,
    description,
    assignedTo,
    status,
    attachments,
    assignedBy,
    projectObjectId,
}) => {
    const newTask = await TaskModel.create({
        title,
        description,
        assignedTo,
        status,
        attachments,
        assignedBy,
        project: projectObjectId,
    })
    return new API_RESPONSE(200, newTask, 'TaskCreated', true)
}
const modifyTaskService = async ({
    taskId,
    title,
    description,
    assignedTo,
    status,
    attachments,
    assignedBy,
}) => {
    taskId = taskId.taskId
    const isTask = await TaskModel.findOne({ _id: taskId })
    if (!isTask) return new API_ERROR(400, 'Task not found')

    const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId,
        {
            $set: {
                title: title,
                description: description,
                assignedTo: assignedTo,
                status: status,
                attachments: attachments,
                assignedBy: assignedBy,
            },
        },
        { new: true }
    )
    return new API_RESPONSE(200, updatedTask, 'TaskModified', true)
}
const deleteTaskService = async ({ taskId }) => {
    const isTask = await TaskModel.findOne({ _id: taskId })
    if (!isTask) return new API_ERROR(400, 'Task not found')
    const taskObjectId = new mongoose.Types.ObjectId(taskId)
    const deletedTask = await TaskModel.findByIdAndDelete(taskObjectId)
    return new API_RESPONSE(200, deletedTask, 'TaskDeleted', true)
}
const getAllTaskService = async ({ projectId }) => {
    //const projectObjectId = new mongoose.Types.ObjectId(projectId)
    projectId = projectId.projectId
    const isProject = await ProjectModel.findById(projectId)
    if (!isProject) return new API_ERROR(400, 'Project No Found in the scope')
    const allTask = await TaskModel.find({ project: projectId })
    if (!allTask) return new API_ERROR(400, 'Task not found')
    return new API_RESPONSE(200, allTask, 'Tasks Found', true)
}
export {
    addTaskService,
    modifyTaskService,
    deleteTaskService,
    getAllTaskService,
}
