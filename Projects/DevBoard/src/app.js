import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthRoute from './Health/health.route.js'
import userRoute from './Routes/user.routes.js'
import projectRoute from './Routes/project.routes.js'
import taskRoute from './Routes/task.routes.js'
import asyncHandler from 'express-async-handler'
dotenv.config({ origin: './.env' })
const app = express()
const options = {
    origin: process.env.ORIGIN,
    allowedHeaders: process.env.HEADER,
    exposedHeaders: process.env.EXPOSED,
}
app.use(cors(options))
app.use(express.json())
app.use('/public', asyncHandler(healthRoute))
app.use('/protected/user', userRoute)
app.use('/protected/project', projectRoute)
app.use('/protected/task', taskRoute)
export default app
