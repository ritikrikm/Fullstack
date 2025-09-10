import mongoose from 'mongoose'
import { taskModelStatus, taskModelStatusValues } from '../utils/constants.js'
import { Schema } from 'mongoose'
const taskSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: taskModelStatusValues,
            default: taskModelStatus.TODO,
        },
        attachments: [
            {
                URI: String,
                mimetype: String,
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
