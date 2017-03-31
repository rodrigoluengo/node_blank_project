let env = require('./env');
let passport = require('passport');
let Strategy = require('passport-http-bearer').Strategy;
let mongoose = require('mongoose');
let User = mongoose.models['User'];

passport.use(new Strategy(
  function(token, next)
  {
    User.findByToken(token, (err, user) =>
    {
      if (err) { return next(err); }
      if (!user) { return next(null, false); }
      return next(null, user);
    });
  })
);

global.Authenticated = (req, res, next) =>
{
    passport.authenticate('bearer', {session: false}, (err, user, info) =>
    {
        if (err) { return next(err); }

        // authentication error
        if (!user) { return res.status(HttpStatus.UNAUTHORIZED).json({ error: info.message || 'Invalid Token'}) }

        // set user on req
        req.user = user;

        next();
    })(req, res, next)
};
