import ProjectModel from '../models/Project.models.js'
import ProjectMember from '../models/ProjectMember.models.js'
import User from '../models/User.models.js'
import mongoose from 'mongoose'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'
const addMembersService = async ({ role, addUserEmail, projectObjectId }) => {
    const user = await User.findOne({ email: addUserEmail })
    console.log('USER IS ', user)
    // If user is null, it means no user was found with the given email.
    // In that case, we should return an error indicating the user was not found.
    if (!user) return new API_ERROR(400, 'UserNotFound')
    // If user is not null, it means a user was found and we can proceed.
    if (!mongoose.Types.ObjectId.isValid(projectObjectId)) {
        return new API_ERROR(400, 'InvalidProjectId')
    }
    //check already existing of project members
    const checkUser = await ProjectMember.findOne({
        user: user._id,
        project: projectObjectId,
    })
    console.log('check USER IS ', checkUser)
    if (checkUser) return new API_ERROR(400, 'Member already exists')
    //creatoin of new member object
    const newMember = await new ProjectMember({
        role: role,
        user: user._id,
        project: projectObjectId,
    })
    console.log(newMember)

    // Add the new member's ObjectId to the project's projectMembers array using $addToSet
    const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectObjectId,
        { $addToSet: { projectMembers: newMember.user } },
        { new: true }
    )
    if (!updatedProject) {
        return new API_ERROR(400, 'Project not found or update failed')
    }
    console.log('Reached End')

    await newMember.save()
    return new API_RESPONSE(
        200,
        newMember,
        'Member has been added to the project'
    )
}
const removeMemberService = async ({
    role,
    removeUserEmail,
    projectObjectId,
}) => {
    if (!mongoose.Types.ObjectId.isValid(projectObjectId))
        return new API_ERROR(400, 'ProjectIdNotValid')
    const checkUser = await User.findOne({ email: removeUserEmail })
    if (!checkUser) return new API_ERROR(400, 'UserNotFound')
    //check projectId
    const checkProject = await ProjectModel.findOne({
        _id: projectObjectId,
    })
    if (!checkProject) return new API_ERROR(400, 'Project do not exiists')
    const checkMember = await ProjectMember.findOne({
        project: projectObjectId,
        user: checkUser._id,
    })
    if (!checkMember) return new API_ERROR(400, 'MemberNotFound')
    // Remove the member from the ProjectMember collection
    await ProjectMember.deleteOne({
        project: projectObjectId,
        user: checkUser._id,
    })

    // Remove the member's ObjectId from the project's projectMembers array
    await ProjectModel.findByIdAndUpdate(projectObjectId, {
        $pull: { projectMembers: checkUser._id },
    })
    const removedMember = checkUser._id
    return new API_RESPONSE(200, removedMember, 'Member removed successfully')
}
export { addMembersService, removeMemberService }
