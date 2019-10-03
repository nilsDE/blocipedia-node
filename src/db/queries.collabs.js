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

    const getUserList = User.findAll();

    return Promise.all([getCollabsForWiki, getTheWiki, getUserList])
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteCollab(req, callback) {
    return Collab.findByPk(req.body.collaborator).then(collab => {
      collab.destroy().then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      });
    });
  },

  createCollab(req, callback) {
    let user;
    return User.findOne({ where: { email: req.body.collaborator } })
      .then(collabUser => {
        user = collabUser;
        Collab.findOne({
          where: {
            userId: collabUser.id,
            wikiId: req.params.wikiId
          }
        })
        .then(collab => {
          if (collab) {
            req.flash("notice", "You have added this user already.");
            callback(401);
          } else {
            Collab.create({
              userId: user.id,
              wikiId: req.params.wikiId
            }).then(collab => {
              callback(null, collab);
            });
          }
        });
      })
      .catch(err => {
        callback(err);
      });
  }
};
