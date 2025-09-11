import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
            unique: true,
        },
        projectDesc: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)
const project = mongoose.model('Project', projectSchema)
export default project
