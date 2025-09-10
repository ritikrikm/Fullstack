import { Schema } from 'mongoose'

const projectSchema = new Schema({
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
        type: Mongoose.Types.ObjectId,
        ref: 'User',
    },
})
const project = mongoose.model('Project', projectSchema)
export default project
