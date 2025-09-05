import mongoose from 'mongoose'
import {
    addMembersService,
    removeMemberService,
} from '../services/projectMembers.services.js'
import { API_ERROR } from '../utils/api-error.js'

const addMembers = async (req, res) => {
    const { role, addUserEmail } = req.body
    const projectId = req.params
    if (addUserEmail === req.user.email)
        console.log("I was same 'doubly'-> ", addUserEmail)
    const projectObjectId = new mongoose.Types.ObjectId(projectId.projectId)
    console.log(projectId, role, addUserEmail)

    const response = await addMembersService({
        role,
        addUserEmail,
        projectObjectId,
    })
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

const removeMember = async (req, res) => {
    const { role, removeUserEmail } = req.body
    const projectId = req.params
    const projectObjectId = new mongoose.Types.ObjectId(projectId.projectId)

    const response = await removeMemberService({
        role,
        removeUserEmail,
        projectObjectId,
    })
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
export { addMembers, removeMember }
