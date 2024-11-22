
import nodemailer from 'nodemailer';

const sendEmail = async ( to: '' | [''], html = '<h1>PM</h1>', subject: string ) => {


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
            to,
            subject,
            html
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
