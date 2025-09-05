import nodemailer from "nodemailer"
const emailFn = async({email,passwordToken})=>{
  console.log(email);
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });
    
      (async () => {
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
          to: email,
          subject: "Hello MF",
          text: `Click this link 
          ${process.env.BASE_URL}/api/v1/users/verify/${passwordToken}
          `, // plain‑text body
          html: `<b>Hello world?</b> <br> <p> Click this link</p> <p>${process.env.BASE_URL}/api/v1/users/verify/${passwordToken} </p>`, // HTML body
        });
      
        console.log("Message sent:", info.messageId);
      })();
}
export default emailFn;
