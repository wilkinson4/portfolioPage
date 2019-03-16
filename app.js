require('dotenv').config();

var express = require("express"),
    app     = express(),
    serveStatic = require('serve-static'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    flash = require("connect-flash"),
    { google } = require('googleapis'),
    OAuth2 = google.auth.OAuth2;
    
const oauth2Client = new OAuth2(
        process.env.CLIENTID,
        process.env.CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    );
oauth2Client.setCredentials({
     refresh_token:  process.env.REFRESHTOKEN
});

async function getAccessToken() {
    await oauth2Client.getRequestHeaders(function(err, tokens){
        if(err){
            console.log(err);
        } else {
            return tokens.credentials.access_token;
        }
    });
}

app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(serveStatic('public/'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Penelope wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}); 

app.get("/", function(req, res){
    res.render("home");
});

// POST route from contact form
app.post("/", function(req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL_USER,
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
        }
    });
    mailOpts = {
        from: req.body.email,
        to: process.env.GMAIL_USER,
        subject: "New Message From My Portfolio Site",
        text: `${req.body.name} says: ${req.body.message} \n (${req.body.email})`
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
        if (error) {
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/#contact");
        }
        else {
            req.flash("success", "Message Sent!");
            res.redirect("/#contact");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started!") ;
});