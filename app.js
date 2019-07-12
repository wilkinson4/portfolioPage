require('dotenv').config();

const express = require('express'),
    app = express(),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    middleware = require('./middleware');



app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(serveStatic('public/'));

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
    res.render("home");
});

// POST ROUTE from contact form
app.post("/", (req, res) => {
    middleware.sendMail(req,res);
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The Server Has Started!");
});