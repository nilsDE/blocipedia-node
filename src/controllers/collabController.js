const collabQueries = require("../db/queries.collabs.js");

module.exports = {
  show(req, res, next) {
    collabQueries.getCollab(req.params.wikiId, (err, values) => {
      if (err || values == null) {
        res.redirect(404, "/");
      } else {
        const [collabs, wiki, user] = values;
        res.render("collaborators/show", { collabs, wiki, user });
      }
    });
  },

  delete(req, res, next) {
    collabQueries.deleteCollab(req, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(401, `/wikis/${req.params.wikiId}`);
      } else {
        res.redirect(303, `/wikis/${req.params.wikiId}/collab`);
      }
    });
  },

  create(req, res) {
    collabQueries.createCollab(req, (err, collab) => {
      if (err) {
        res.redirect(`/wikis/${req.params.wikiId}/collab`);
      } else {
        res.redirect(303, `/wikis/${req.params.wikiId}/collab`);
      }
    });
  }
};
