"use strict"

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get('/auth/mercadolibre', passport.authorize('mercadolibre'));

router.get('/auth/mercadolibre/callback', passport.authorize('mercadolibre', { 
    failureRedirect: '/login' 
}), (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/anuncio');
    });

router.get('/', ensureAuthenticated, (req, res) => {
        res.send("Logged in user: " + req.user.nickname);
    }
);

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect('/auth/mercadolibre');
};


module.exports = router;
