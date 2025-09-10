import Note from '../models/Note.models.js'
import ProjectModel from '../models/Project.models.js'
import { API_ERROR } from '../utils/api-error.js'
import { API_RESPONSE } from '../utils/api-response.js'

const addNoteService = async ({ projectId, content, createdBy, role }) => {
    projectId = projectId.projectId
    const isProject = await ProjectModel.findById(projectId.projectId)
    if (!isProject) return new API_ERROR(400, 'Project not found')
    const newNote = await Note.create({
        createdBy: createdBy,
        project: projectId,
        content,
    })
    return new API_RESPONSE(200, newNote, 'NoteAdded', true)
}
const modifyNoteService = async ({ noteId, content }) => {
    const isNote = await Note.findOne({ _id: noteId })
    if (!isNote) return new API_ERROR(400, 'Note not found')
    const noteObjectId = new mongoose.Types.ObjectId(noteId)
    const updatedNote = await Note.findByIdAndUpdate(
        noteObjectId,
        {
            $set: {
                content: content,
            },
        },
        { new: true }
    )
    return new API_RESPONSE(200, updatedNote, 'NoteModified', true)
}
const deleteNoteService = async ({ noteId }) => {
    const isNote = await Note.findOne({ _id: noteId })
    if (!isNote) return new API_ERROR(400, 'Note not found')
    const noteObjectId = new mongoose.Types.ObjectId(noteId)
    const deletedNote = await ProjectModel.deleteOne(
        isNote.project._id,
        { $pull: { project: noteObjectId } },
        { new: true }
    )
    return new API_RESPONSE(200, deletedNote, 'NoteDeleted', true)
}
export { addNoteService, modifyNoteService, deleteNoteService }
