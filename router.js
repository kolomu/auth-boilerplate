// importing authentication route
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// create the middleware / interceptor of sorts
// so that every requests thats needs auth go though this channel
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

// export function
module.exports = function(app){
  // any request coming in, must pass this requireAuth step and then fn is called
  app.get('/', requireAuth, function(req, res){
    res.send({hi: 'there'})
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  
}