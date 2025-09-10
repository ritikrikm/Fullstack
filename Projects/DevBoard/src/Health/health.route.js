import { Router } from 'express'
import healthController from '../Health/health.controller.js'
const healthRoute = Router()
healthRoute.route('/health').get(healthController)
export default healthRoute
