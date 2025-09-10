import { addNoteService } from '../services/note.services.js'
const addNote = async (req, res) => {
    const projectId = req.params
    const { content } = req.body
    const createdBy = req.user._id
    const role = req.user.role
    const response = await addNoteService({
        projectId,
        content,
        createdBy,
        role,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const modifyNote = async (req, res) => {
    const noteId = req.params
    const { content } = req.body
    const response = await modifyNoteService({
        noteId,
        content,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
const deleteNote = async (req, res) => {
    const noteId = req.params

    const response = await deleteNoteService({
        noteId,
    })
    if (response instanceof API_ERROR) {
        return res.status(response.statusCode || 400).json({
            message: response.message,
            success: response.isSuccess,
        })
    }

    res.status(200).json({
        message: response.message,
        data: response.data,
        success: response.isSuccess,
    })
}
export { addNote, modifyNote, deleteNote }
