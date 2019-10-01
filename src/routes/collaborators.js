const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");

router.get("/wikis/:wikiId/collab", collabController.show);

module.exports = router;