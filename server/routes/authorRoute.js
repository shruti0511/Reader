const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/isAdmin")
const upload = require("../utils/uploadExcel")

router.use(verifyJWT);
router
    .route("/")
    .get(authorController.getAllAuthor)
    .post(isAdmin,authorController.addAuthor)
    .patch(isAdmin,authorController.updateAuthor)
    .delete(isAdmin,authorController.deleteAuthor);

    router.route("/importExcel").post(isAdmin,upload.single('file'),authorController.importExcel)
    router.route("/author-books").get(authorController.getAuthorsWithbook)
module.exports = router;