import Mailgen from 'mailgen'
import emailSend from './email-engine.js'
const startEmail = (context, email) => {
    // Configure mailgen by setting a theme and your product info
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'DevBoard',
            link: 'https://devboard.ca/',
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        },
    })

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email)

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(email)
    emailSend(context, { emailBody, emailText })
}
export default startEmail
