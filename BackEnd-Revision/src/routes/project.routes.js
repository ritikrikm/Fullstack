import express from 'express'
import { createProject } from '../controllers/project.controllers.js'
import { addMembers } from '../controllers/projectMembers.controllers.js'
const projectRouter = express.Router()

projectRouter.post('/createProject', createProject)
projectRouter.post('/addMember/:projectId', addMembers)

// router.post('/modifyProject')
// router.post('/updateProject')

export default projectRouter
