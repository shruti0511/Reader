const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../utils/uploadExcel");

router.use(verifyJWT);
router
    .route("/")
    .get(languageController.getAllLanguage)
    .post(isAdmin,languageController.addLanguage)
    .patch(isAdmin,languageController.updateLanguage)
    .delete(isAdmin,languageController.deleteLanguage);

router.route("/importExcel").post(isAdmin,upload.single('file'),languageController.addExcel)
module.exports = router;