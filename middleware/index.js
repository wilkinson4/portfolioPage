// all the middleare goes here
require('dotenv').config();

const nodemailer = require('nodemailer'),
    middlewareObj = {};

async function main() {
    middlewareObj.sendMail = (req, res, next) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secureConnection: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        const mailOpts = {
            from: req.body.email,
            to: process.env.USER,
            subject: "New Message From My Portfolio Site",
            text: `${req.body.name} says: ${req.body.message} \n (${req.body.email})`,
        }

        transporter.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log(error);
                req.flash("error", "Something went wrong. Please try again.");
                res.redirect("/#contact");
            } else {
                req.flash("success", "Message Sent!");
                res.redirect("/#contact");
            }
        });
    }
}

main().catch(console.error);


module.exports = middlewareObj;