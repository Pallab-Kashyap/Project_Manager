import { Document } from 'mongoose';
import nodemailer from 'nodemailer';
import { forgetPasswordTamplate } from '../utils/emailTemplates';
import { UserSchema } from '../models/userModel';

const sendEmail = async ( to: '' | [''], template = '<h1>PM</h1>' ) => {


try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: to || 'pallabk19@gmail.com',
            subject: 'Test Email',
            text: 'Hello from Node.js!',
            html: template,
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info
} catch (error) {
    console.log(error);
    return false
}
};

export default sendEmail
