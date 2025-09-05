import mongoose from 'mongoose'

const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Connected with database ')
    } catch (error) {
        console.log('Connection error', error)
    }
}
export default db
