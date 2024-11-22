
const forgetPasswordTamplate = (resetLink: string, currentYear = 2020, websiteName = 'Project Manager') =>
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0052cc;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .content p {
            margin: 0 0 15px;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button-container a {
            text-decoration: none;
            background-color: #0052cc;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888888;
            padding: 10px 20px;
            border-top: 1px solid #eeeeee;
            background-color: #f9f9f9;
        }
        .footer a {
            color: #0052cc;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>${websiteName}</h1>
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>We received a request to reset your password for your **${websiteName}** account. Click the button below to reset your password.</p>
            <div class="button-container">
                <a href="${resetLink}" target="_blank">Reset Password</a>
            </div>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Best Regards,</p>
            <p>The ${websiteName} Team</p>
        </div>
        <div class="footer">
            <p>If you have any questions, contact us at <a href="mailto:example@xyz.com">example@xyz.com</a></p>
            <p>&copy; ${currentYear} ${websiteName}, All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`

const inviteTemplate = (projectName: string, invitedBy: string, position: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            text-align: center;
            background-color: #4CAF50;
            padding: 20px;
            color: white;
            border-radius: 8px 8px 0 0;
        }

        .email-content {
            margin: 20px 0;
        }

        .button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>You're Invited to a Project!</h2>
        </div>
        <div class="email-content">
            <p>Hello,</p>
            <p>You have been invited to join the project <strong>${projectName}</strong>!</p>
            <p>This project was created by <strong>${invitedBy}</strong> and you have been assigned the position of <strong>${position}</strong>.</p>
            <p>We are excited to have you on board and look forward to working with you!</p>
`
const addLinkToEmailTamplate = (link: string) => 
`    <a href="${link}" class="button">Join the Project</a>
    </div>
    <div class="footer">
        <p>If you did not expect this invitation, please disregard this email.</p>
    </div>
</div>
</body>
</html>`


export {
    forgetPasswordTamplate,
    inviteTemplate,
    addLinkToEmailTamplate,
}

