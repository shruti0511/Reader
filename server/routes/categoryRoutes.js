const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const categoryImageHandle = require("../utils/uploadCategoryImage")
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/isAdmin")

router.use(verifyJWT);
router
    .route("/")
    .get(categoryController.getAllCategory)
    .post(isAdmin, categoryImageHandle.uploadCategoryImage.single('file'), categoryController.addCategory)
    .patch(isAdmin, categoryImageHandle.uploadCategoryImage.single('file'), categoryController.updateCategory)
    .delete(isAdmin, categoryController.deleteCategory);
router.route("/category-books").get(categoryController.getCategoriesWithbook)
module.exports = router;