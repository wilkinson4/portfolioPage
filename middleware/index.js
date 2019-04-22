// all the middleare goes here
require('dotenv').config();

const nodemailer = require('nodemailer'),
      smtpTransport = require('nodemailer-smtp-transport'),
      middlewareObj = {};
      

    
middlewareObj.sendMail = function(req, res, next) {
    let mailOpts, transporter;
    transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'gmail',
            user: process.env.USER,
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
        }
    }));
    mailOpts = {
        from: req.body.email,
        to: process.env.USER,
        subject: "New Message From My Portfolio Site",
        text: `${req.body.name} says: ${req.body.message} \n (${req.body.email})`
    };
    transporter.sendMail(mailOpts, function(error, response) {
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