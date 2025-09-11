import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { logger } from './logger.js'

// Create a test account or replace with real credentials.
const emailSend = async (context, pref) => {
    dotenv.config({
        path: '../.env',
    })
    console.log(process.env.USERID)
    const transporter = nodemailer.createTransport({
        host: process.env.HOSTID,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USERID,
            pass: process.env.PASSID,
        },
    })

    try {
        const info = await transporter.sendMail({
            from: 'noreply@DevBoard.ca',
            to: context.email,
            subject: 'Hello ✔',
            text: pref.emailText, // plain‑text body
            html: pref.emailBody, // HTML body
        })

        console.log('Message sent:', info.messageId)
        return info
    } catch (error) {
        console.error('Email failed:', error)
        throw error
    }
}
export default emailSend
