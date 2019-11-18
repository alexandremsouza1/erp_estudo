const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const passport = require("passport");
const keys = require('./keys');

//callbackURL: '/auth/mercadolivre/redirect'

passport.use(
    new MercadoLibreStrategy({
    
    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: 'https://frozen-bayou-77555.herokuapp.com/auth/mercadolibre/callback',

}, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    })
);

/*
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
*/







