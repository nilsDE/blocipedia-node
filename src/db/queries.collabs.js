const Collab = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  getCollab(id, callback) {
    const getCollabsForWiki = Collab.findAll({
      where: { wikiId: id },
      include: [
        {
          model: User
        }
      ]
    });

    const getTheWiki = Wiki.findByPk(id);

    return Promise.all([getCollabsForWiki, getTheWiki])
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};
