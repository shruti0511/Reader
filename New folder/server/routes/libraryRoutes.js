const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/libraryController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
    .route("/")
    .get(libraryController.getUserLibrary)
    .post(libraryController.addLibrary)

module.exports = router;