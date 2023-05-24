const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const bookImageHandle = require("../utils/uploadBookImage")

router
    .route("/")
    .get(bookController.getAllBook)
    .post(
        bookImageHandle.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'epub', maxCount: 1 }
          ]),
        // bookImageHandle.upload.any(),
        bookController.addBook
    )
    .patch(
        bookImageHandle.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'epub', maxCount: 1 }
          ]),
        bookController.updateBook
    )
    .delete(bookController.deleteBook);

module.exports = router;