import mongoose from 'mongoose'
const { Schema } = mongoose

const projectSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
        },
        projectMembers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProjectMember',
            },
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const ProjectModel = mongoose.model('Project', projectSchema)

export default ProjectModel
