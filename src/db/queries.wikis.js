const Wiki = require("./models").Wiki;
const collaborator = require("./models").collaborator;
const Authorizer = require("../policies/application");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getAllWikis(id, callback) {
    // return Wiki.findAll({ where: { private: false } })

    return Wiki.findAll({ where: {
        [Op.or]: [
          { private: false },
          { [Op.and]:[
            { private: true },
            { userId: id }
          ]} 
        ]
    },
    include: [{
      model: collaborator,
      as: "collabs",
      where: { userId: id }
    }]
  })

      .then(wikis => {
        callback(null, wikis);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAllPublicWikis(callback) {
    return Wiki.findAll({ where: { private: false } })
      .then(wikis => {
        callback(null, wikis);
      })
      .catch(err => {
        callback(err);
      });
  },
  addWiki(newWiki, callback) {
    return Wiki.create({
        title: newWiki.title,
        body: newWiki.body,
        private: newWiki.private,
        userId: newWiki.userId
    })
      .then((wiki) => {
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },

  getWiki(id, callback) {
    return Wiki.findByPk(id)
      .then((wiki) => {   
          callback(null, wiki);
      })
      .catch(err => {
        callback(401);
      });
  },

  deleteWiki(req, callback) {
    return Wiki.findByPk(req.params.id)
      .then((wiki) => {
        const authorized = new Authorizer(req.user, wiki).destroy();

        if (authorized) {
          wiki.destroy()
          .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
          });
        } else {
            //error hits here
          req.flash("notice", "You are not authorized to do that....");
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },

  updateWiki(req, updatedWiki, callback) {
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      if (!wiki) {
        return callback(404);
      } else {
        wiki.update(updatedWiki, {
            fields: Object.keys(updatedWiki)
            })
            .then(() => {
            callback(null, wiki);
            })
        }
    })
    .catch(err => {
        callback(err);
    });
  }
};