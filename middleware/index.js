// all the middleare goes here
require('dotenv').config();

let nodemailer = require('nodemailer'),
    middlewareObj = {};
    
middlewareObj.sendMail = function(req, res, next) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    mailOpts = {
        from: req.body.email,
        to: process.env.USER,
        subject: "New Message From My Portfolio Site",
        text: `${req.body.name} says: ${req.body.message} \n (${req.body.email})`
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
        if (error) {
            console.log(error);
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/#contact");
        }
        else {
            req.flash("success", "Message Sent!");
            res.redirect("/#contact");
        }
    });
}

module.exports = middlewareObj;