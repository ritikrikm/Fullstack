import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { logger } from './Utils/logger.js'
dotenv.config()
const database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        logger.info('Mongoose Connected')
    } catch (error) {
        logger.error(`Database connection error with ${error}`)
        process.exit(1)
    }
}
export { database }
