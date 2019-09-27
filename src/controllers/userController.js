const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const stripeKey = process.env.SECRET_KEY;
const publishableKey = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(stripeKey);

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
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: newUser.email,
          from: "signedup@blocipedia.com",
          subject: "You've Signed Up with Blocipedia!",
          text: "Log in and start collaborating on wikis!",
          html: "<strong>Log in and start collaborating on wikis!</strong>"
        };
        sgMail.send(msg);
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/");
        });
      }
    });
  },
  signInForm(req, res, next) {
    res.render("users/signin");
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/signin");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },
  upgradeForm(req, res, next) {
    res.render("users/upgrade");
  },
  upgrade(req, res, next) {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        stripe.charges.create({
          amount: 1500,
          currency: "usd",
          customer: customer.id,
          description: "Premium membership"
        });
      })
      .then(charge => {
        userQueries.upgradeUser(req.user.dataValues.id);
        res.render("users/upgrade_success");
      })
      .catch(err => console.log(err));
  },
  seeUpgradeSuccess(req, res, next) {
    res.render("users/upgrade_success");
  },
  downgrade(req, res, next) {
    userQueries.downgradeUser(req.user.dataValues.id);
    req.flash("notice", "You've successfully downgraded your account!");
    res.redirect("/");
  },
  show(req, res, next) {
    res.render("users/show");
  }
};
