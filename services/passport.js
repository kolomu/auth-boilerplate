// import libraries
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
// import specific properties
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
 // verify this email and password, call done with the user
 // if it is the correct email and password
 // otherweise call done with false
 User.findOne({email : email}, function(err, user){
    if(err) {return done (err); }
    if(!user) {return done(null, false); }

    // compare passwords - is 'password' equal to user.password
    user.comparePassword(password, function(err, isMatch){
        if(err) { return done(err); }
        if(!isMatch){ return done(null, false); }

        return done(null, user);
    })

 });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if user id in the payload exists in our database
    User.findById(payload.sub, function(err, user){
        // tried a search, but error occured
        if(err) {return done(err, false); }

        if(user) {
             // provided user exists in db, call done with that
            done(null, user);
        } else {
            // otherwise call done without a user object
            // did a search, coudln't find a user
            done(null, false);
        }
    });
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
