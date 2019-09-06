const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUpForm(req, res, next) {
    res.render("users/signup");
  },
  create(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("error", err);
        res.redirect("/users/signup");

      } else {
        console.log('sign up code');
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: newUser.email,
          from: 'signedup@blocipedia.com',
          subject: "You've Signed Up with Blocipedia!",
          text: 'Log in and start collaborating on wikis!',
          html: '<strong>Log in and start collaborating on wikis!</strong>',
        };
        console.log(msg)
        sgMail.send(msg);
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/");
        });
      }
    });
  },
};