const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
    .route("/")
    .get(ratingController.getAllRatings)
    .post(ratingController.addRating)
    .patch(ratingController.updateRating)
    .delete(ratingController.deleteRating);

module.exports = router;