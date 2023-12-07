// middleware/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userdata');

passport.use('user', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ UserName: username, Role: 'user' });
    if (!user) {
      console.log('User not found. Authentication failed.');
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    return done(null, user);
  } catch (err) {
    console.error('Error during authentication:', err);
    return done(err);
  }
}));


passport.use('admin', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ UserName: username, Role: 'admin' });
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


passport.serializeUser(async (user, done) => {
  try {
    const id = await Promise.resolve(user.id);
    done(null, id);
  } catch (err) {
    done(err, null);
  }
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


function isAdmin(req, res, next) {
   if (req.isAuthenticated() && req.user.Role === 'admin') {
    return next();
  }
  res.redirect('/auth/adminLogin'); // Redirect to login if not authenticated or not an admin
}

module.exports = {
  isAdmin,
  initialize: passport.initialize(),
  session: passport.session(),
};
