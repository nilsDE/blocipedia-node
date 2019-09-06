module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const usersRoutes = require('../routes/users');
    
    app.use(staticRoutes);
    app.use(usersRoutes);
  }
};