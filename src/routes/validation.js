module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      console.log(req.body)
      req.checkBody("email", "email must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({
        min: 6
      });
      req.checkBody("password_conf", "must match password provided").optional().matches(req.body.password);
    }
    const errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer);
    } else {
      console.log('i am in next')
      return next();
    }
  }
};