module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const usersRoutes = require('../routes/users');
    const wikiRoutes = require('../routes/wikis');
    const collabRoutes = require('../routes/collaborators');

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require('../../spec/support/mock-auth.js');
      mockAuth.fakeIt(app);
    }
    
    app.use(staticRoutes);
    app.use(usersRoutes);
    app.use(wikiRoutes);
    app.use(collabRoutes);
  }
};