import mongoose from 'mongoose'

const noteSchema = new Schema(
    {
        createdBy: {
            type: Schema.types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            default: '',
        },
        project: {
            type: Schema.types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
