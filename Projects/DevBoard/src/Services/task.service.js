import Task from '../Models/task.model.js'
import User from '../Models/user.models.js'
import Project from '../Models/project.model.js'
import { API_ERROR } from '../Utils/api-error.js'
import { API_RESPONSE } from '../Utils/api-response.js'
import mongoose from 'mongoose'

const createTaskService = async ({
    content,
    assignedTo,
    assignedBy,
    dueDate,
    createdBy,
    projectId,
}) => {
    // Validate referenced users and project
    const assignedToUser = await User.findById(assignedTo)
    if (!assignedToUser) throw new API_ERROR(404, 'AssignedToUserNotFound', false)

    const assignedByUser = await User.findById(assignedBy)
    if (!assignedByUser) throw new API_ERROR(404, 'AssignedByUserNotFound', false)

    const createdByUser = await User.findById(createdBy)
    if (!createdByUser) throw new API_ERROR(404, 'CreatedByUserNotFound', false)

    const projectObj = await Project.findById(projectId)
    if (!projectObj) throw new API_ERROR(404, 'ProjectNotFound', false)
    console.log(projectId)
    // Create the task
    const newTask = await Task.create({
        content,
        assignedTo: new mongoose.Types.ObjectId(assignedTo),
        assignedBy: new mongoose.Types.ObjectId(assignedBy._id),
        dueDate,
        createdBy: new mongoose.Types.ObjectId(createdBy._id),
        project: new mongoose.Types.ObjectId(projectId),
    })

    return new API_RESPONSE(201, 'TaskCreated', newTask, true)
}
const modifyTaskService = async ({ taskId, content, assignedTo, assignedBy, dueDate }) => {
    // Validate task existence
    const task = await Task.findById(taskId)
    if (!task) {
        throw new API_ERROR(404, 'TaskNotFound', false)
    }

    // Validate referenced users if provided
    if (assignedTo) {
        const assignedToUser = await User.findById(assignedTo)
        if (!assignedToUser) throw new API_ERROR(404, 'AssignedToUserNotFound', false)
    }
    if (assignedBy) {
        const assignedByUser = await User.findById(assignedBy)
        if (!assignedByUser) throw new API_ERROR(404, 'AssignedByUserNotFound', false)
    }

    // Update fields if provided
    if (content !== undefined) task.content = content
    if (assignedTo !== undefined) task.assignedTo = new mongoose.Types.ObjectId(assignedTo)
    if (assignedBy !== undefined) task.assignedBy = new mongoose.Types.ObjectId(assignedBy)
    if (dueDate !== undefined) task.dueDate = dueDate

    await task.save()

    return new API_RESPONSE(200, 'TaskModified', task, true)
}
const deleteTaskService = async ({ taskId }) => {
    // Validate task existence
    const task = await Task.findById(taskId)
    if (!task) {
        throw new API_ERROR(404, 'TaskNotFound', false)
    }

    await Task.deleteOne({ _id: taskId })

    return new API_RESPONSE(200, 'TaskDeleted', null, true)
}
const getTaskByIdService = async ({ taskId }) => {
    // Validate task existence
    const task = await Task.findById(taskId)
        .populate('assignedTo')
        .populate('assignedBy')
        .populate('createdBy')
        .populate('project')
    if (!task) {
        throw new API_ERROR(404, 'TaskNotFound', false)
    }
    return new API_RESPONSE(200, 'TaskFound', task, true)
}

const getAllTasksService = async () => {
    const tasks = await Task.find({})
        .populate({
            path: 'assignedTo',
            select: '-password -isVerified -refreshToken -createdAt -updatedAt',
        })
        .populate({
            path: 'assignedBy',
            select: '-password -isVerfied -createdAt -updatedAt -refreshToken',
        })
        .populate({
            path: 'createdBy',
            select: '-password -isVerfied -createdAt -updatedAt -refreshToken',
        })
        .populate({
            path: 'project',
            select: '-createdAt -updatedAt',
        })
    return new API_RESPONSE(200, 'TasksFetched', tasks, true)
}
export {
    createTaskService,
    modifyTaskService,
    deleteTaskService,
    getTaskByIdService,
    getAllTasksService,
}
