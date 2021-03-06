const nodemailer = require("nodemailer")
require('dotenv').config()
let send = async args =>{
    try{
        let transporter = nodemailer.createTransport(
            configMail = {
                service:'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS_EMAIL
                }
            }
        )

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: args.email,
            subject:args.subject,
            html:args.body
        })
        console.log("Message sent: %s", info.messageId)
        return nodemailer.getTestMessageUrl(info)
    }catch (err) {
        console.log(err)
    }
}

module.exports = {
    send
}
