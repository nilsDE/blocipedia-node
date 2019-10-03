const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");

router.get("/wikis/:wikiId/collab", collabController.show);
router.post("/wikis/:wikiId/collabs/delete", collabController.delete);
router.post("/wikis/:wikiId/collabs/create", collabController.create);

module.exports = router;