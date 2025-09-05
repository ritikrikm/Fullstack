import e from 'express'
import { addMembers } from '../controllers/projectMembers.controllers.js'
const router = e.Router()

router.post('/addMember/:projectId', addMembers)
router.post('/modifyMember')
router.post('/deleteMember')

export default router
