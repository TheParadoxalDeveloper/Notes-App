import nodemailer from "nodemailer"
import { emailHTML } from "./emailDesign.js";
import jwt from "jsonwebtoken"



export const emailHandler = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ahmedeidmajorel@gmail.com",
            pass: "uwwcmhhokeaehqgz",
        },
    });

    jwt.sign({ email }, 'secretKeyEmail', async (err, token) => {
        const info = await transporter.sendMail({
            from: '"The Paradoxal Developer 👻" <ahmedeidmajorel@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Welcome ${email}`, // Subject line
            html: emailHTML(token) // html body
        });

        console.log("Message sent: %s", info.messageId);
    })


}
