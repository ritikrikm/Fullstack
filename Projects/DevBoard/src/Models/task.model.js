import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            default: 'Low',
        },
        assignedTo: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
    },
    { timestamps: true }
)
const task = mongoose.model('Task', taskSchema)
export default task
