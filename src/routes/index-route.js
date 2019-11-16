"use strict"

const express = require("express");
const passport = require("passport");
const router = express.Router();
/*
var meli = require('mercadolibre');
const CLIENT_ID = 8828109757058917;
const CLIENT_SECRET = 'CzJ8bUeMslAaNQ1BrBvTxozJ5OyHKK2G'

var meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET);

router.get('/', (req, resp, next) => {
    meliObject.get('sites/MLB/search?q=Motorola', (err, res) => {
        resp.status(200).send(res);
        //console.log(res.results.map(result => result.title));
    });

});
*/

router.get('/auth/mercadolibre', passport.authorize('mercadolibre', {
    scope: ['profile']
}));

router.get('/auth/mercadolibre/callback', passport.authorize('mercadolibre', { 
        failureRedirect: '/login' 
    }),(req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/', ensureAuthenticated, (req, res) => {
        console.log("Logged in user: " + req.user.nickname);
        res.send("Logged in user: " + req.user.nickname);
    }
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect('/auth/mercadolibre');
};

module.exports = router;