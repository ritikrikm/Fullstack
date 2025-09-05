import app from './app.js'
import dotenv from 'dotenv'
import db from '../src/db/database.js'

dotenv.config({
    path: './.env',
})

const PORT = process.env.PORT || 8080
db()
    .then(() => console.log('I am connected!'))
    .catch((err) => console.log('Errr', err))

app.listen(PORT, console.log('I am running on PORT', PORT))
