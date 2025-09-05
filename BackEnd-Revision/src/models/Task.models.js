import mongoose from 'mongoose'
import { taskModelStatus } from '../utils/constants.js'
const taskSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: Enum,
            default: taskModelStatus.TODO,
        },
        attachments: [
            {
                URI,
                mimetype,
            },
        ],
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel
