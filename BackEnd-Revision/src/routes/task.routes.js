import e from 'express'

const router = e.Router()

router.post('/addTask')
router.post('/modifyTask')
router.post('/deleteTask')

export default router
