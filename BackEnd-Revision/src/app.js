import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import projectRouter from '../src/routes/project.routes.js'
import userRouter from '../src/routes/user.routes.js'
const app = express()
console.log('Entered here')
app.use(express.json())
app.use(
    cors({
        origin: true,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],
    })
)
app.use(cookieParser())

app.use('/v1', userRouter)
export default app
