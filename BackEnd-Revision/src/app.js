import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import projectRouter from '../src/routes/project.routes.js'
import userRouter from '../src/routes/user.routes.js'
import taskRouter from '../src/routes/task.routes.js'
import noteRouter from '../src/routes/note.routes.js'
import memberRouter from '../src/routes/projectMember.routes.js'
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

app.use('/v1/user', userRouter)
app.use('/v1/project', projectRouter)
app.use('/v1/task', taskRouter)
app.use('/v1/note', noteRouter)
app.use('/v1/member', memberRouter)

export default app
