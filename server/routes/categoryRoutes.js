const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const categoryImageHandle = require("../utils/uploadCategoryImage")

router
    .route("/")
    .get(categoryController.getAllCategory)
    .post(categoryImageHandle.uploadCategoryImage.single('file'),categoryController.addCategory)
    .patch(categoryImageHandle.uploadCategoryImage.single('file'),categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;