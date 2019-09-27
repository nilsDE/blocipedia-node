const User = require("./models").Users;
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword
    })
      .then(user => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user.email,
          from: "signedup@blocipedia.com",
          subject: "You've Signed Up with Blocipedia!",
          text: "Log in and start collaborating on wikis!",
          html: "<strong>Log in and start collaborating on wikis!</strong>"
        };
        sgMail.send(msg);
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  },
  getUser(id, callback) {
    let result = {};
    User.findById(id).then(user => {
      if (!user) {
        callback(404);
      } else {
        result["user"] = user;
      }
    });
  },
  upgradeUser(id, callback) {
    return User.findByPk(id)
      .then(user => {
        console.log(user)
        if (!user) {
          return callback(404);
        } else {
          return user.updateAttributes({ role: "premium" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  downgradeUser(id, callback) {
    return User.findByPk(id)
      .then(user => {
        if (!user) {
          return callback(404);
        } else {
          return user.updateAttributes({ role: "standard" });
        }
      })
      .catch(err => {
        callback(err);
      });
  }
};
