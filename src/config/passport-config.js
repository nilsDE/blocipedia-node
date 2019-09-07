const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").Users;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      console.log('email:', email, password)
      User.findOne({
          where: {
            email
          }
        })
        .then((user) => {
          console.log('in then', user)
          if (!user || !authHelper.comparePass(password, user.password)) {
            return done(null, false, {
              message: "Invalid email or password"
            });
          }
          return done(null, user);
        });
    }));
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });
    passport.deserializeUser((id, callback) => {
      User.findByPk(id)
        .then((user) => {
          callback(null, user);
        })
        .catch((err => {
          callback(err, user);
        }));
    });
  }
};