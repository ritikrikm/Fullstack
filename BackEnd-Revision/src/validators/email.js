import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const sendEmail = (email, user) => {
    // Configure mailgen by setting a theme and your product info
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Ritik Mehta',
            link: 'https://www.linkedin.com/in/-ritikmehta-',
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        },
    })

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email)
    console.log(emailBody)
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(email)
    console.log(emailText)

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    })

    // Wrap in an async IIFE so we can use await.
    ;(async () => {
        const info = await transporter.sendMail({
            from: 'ritikmehta@rik.com',
            to: user.email,
            subject: 'Hello ✔',
            text: emailText, // plain‑text body
            html: emailBody, // HTML body
        })

        console.log('Message sent:', info.messageId)
    })()
}
export { sendEmail }
