const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const passport = require("passport");
const keys = require('./keys');

//callbackURL: '/auth/mercadolivre/redirect'

passport.use(
    new MercadoLibreStrategy({
    
    callbackURL: 'http://localhost:5000',
    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
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







