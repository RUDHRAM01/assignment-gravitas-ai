const nodemailer = require('nodemailer');
require('dotenv').config();

const sendVerifyMail = (email, id) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: false,
                requireTLS: true,
                user: 'noreplychat.rs@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'noreplychat.rs@gmail.com',
            to: email,
            subject: 'Verify your email',
            html: `
<body>
    <table width="600" cellpadding="0" cellspacing="0" style="margin:auto; background-color:#f8f9fa; border:1px solid #e0e0e0; padding:20px;">
        <tr>
            <td style="text-align:center; padding:20px; background-color:#ffffff;">
                <img src="" alt="Logo" style="max-width:100%; height:auto;">
            </td>
        </tr>
        <tr>
            <td style="padding:20px; background-color:#ffffff;">

                <h1 style="font-size:24px; font-family: Arial, sans-serif; color:#333333;">Welcome to Our Service!</h1>
                <p style="font-size:16px; font-family: Arial, sans-serif; color:#666666; line-height:1.5;">Thank you for signing up for our service. We are excited to have you on board!</p>
                <a href="http://localhost:3000/api/auth/verify?id=${id}" style="display:inline-block; background-color:#28a745; color:#ffffff; text-decoration:none; padding:10px 20px; margin-top:20px; border-radius:4px; font-family: Arial, sans-serif;">Verify Email</a>
            </td>
        </tr>
        
        <tr>
            <td style="text-align:center; padding:20px; background-color:#e9ecef;">
                <p style="font-size:14px; font-family: Arial, sans-serif; color:#666666;">© 2023 CRUD. All Rights Reserved.</p>
                <p style="font-size:14px; font-family: Arial, sans-serif; color:#666666;">Rudhram Saraswat</p>
            </td>
        </tr>
    </table>
</body>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return false;
            } else {
                return true;
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}


module.exports = { sendVerifyMail };