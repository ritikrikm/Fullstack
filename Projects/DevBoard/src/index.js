import app from './app.js'
import dotenv from 'dotenv'
import { database } from './database.js'
import { logger } from './Utils/logger.js'

dotenv.config({ path: './.env' })
const PORT = process.env.PORT ?? 8080
database()
    .then(() => {
        logger.info('ConnectionCompleted')
    })
    .catch(() => {
        logger.error('Connection could not complete')
    })
app.listen(PORT, () => {
    console.log(`Running on server ${PORT}`)
})
