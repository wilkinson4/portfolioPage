require('dotenv').config();

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    path = require('path'),
    ReCAPTCHA = require('node-grecaptcha-verify').ReCAPTCHA,
    middleware = require('../middleware/index')



app.use(flash());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/../views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Penelope wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// ==========
// ROUTES
// ==========

//INDEX ROUTE
app.get("/", (req, res) => {
    res.render("home")
})

// POST ROUTE from contact form
app.post("/", (req, res) => {
    const reCaptcha = new ReCAPTCHA(process.env.CAPTCHA_SECRET, 0.5)
    const getVerificationResult = async (reCaptcha) => {
        return await reCaptcha.verify(req.cookies.token)
    }
    getVerificationResult(reCaptcha)
        .then(verificationResult => {
            // console.log(reCaptcha)
            // console.log(verificationResult)
            if (verificationResult.isHuman) {
                // reCAPTCHA response was accepted!
                middleware.sendMail(req, res)
            } else {
                // reCAPTCHA token denied.
                req.flash("error", "Something went wrong. Please try again.");
                res.redirect("/#contact");
            }

        })
});


app.listen(8080, () => {
    console.log("The Server Has Started!")
});

module.exports = app;
