// all the middleare goes here
require('dotenv').config();

const nodemailer = require('nodemailer'),
    middlewareObj = {};

async function main() {
    middlewareObj.sendMail = (req, res, next) => {
        const transporter = nodemailer.createTransport({
            service: 'Hotmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        const mailOpts = {
            from: process.env.USER,
            to: process.env.USER,
            subject: "New Message From My Portfolio Site",
            text: `${req.body.name} says:\n ${req.body.message} \n (${req.body.email})`,
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