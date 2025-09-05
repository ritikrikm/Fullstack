import mongoose from 'mongoose'
import { UserModelRole, UserModelRoleValues } from '../utils/constants.js'
const { Schema } = mongoose
const projectMemberSchema = new Schema(
    {
        role: {
            type: String,
            enim: UserModelRoleValues,
            default: UserModelRole.MEMBER,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
    },
    {
        timestamps: true,
    }
)

const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema)

export default ProjectMember
