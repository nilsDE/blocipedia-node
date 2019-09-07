const User = require("./models").Users;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

module.exports = {

  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword
      })
      .then((user) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user.email,
          from: 'signedup@blocipedia.com',
          subject: "You've Signed Up with Blocipedia!",
          text: 'Log in and start collaborating on wikis!',
          html: '<strong>Log in and start collaborating on wikis!</strong>',
        };
        sgMail.send(msg);
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      });
  },

  getUser(id, callback) {
    // #1
    let result = {};
    User.findById(id)
      .then((user) => {
        // #2
        if (!user) {
          callback(404);
        } else {
          // #3
          result["user"] = user;
          // #4
          Post.scope({
              method: ["lastFiveFor", id]
            }).findAll()
            .then((posts) => {
              // #5
              result["posts"] = posts;
              // #6
              Comment.scope({
                  method: ["lastFiveFor", id]
                }).findAll()
                .then((comments) => {
                  // #7
                  result["comments"] = comments;
                  callback(null, result);
                })
                .catch((err) => {
                  callback(err);
                });
            });
        }
      });
  }
};