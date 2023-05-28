const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const bookImageHandle = require("../utils/uploadBookImage")
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/isAdmin")

router.use(verifyJWT);
router
    .route("/")
    .get( bookController.getAllBook)
    .post(isAdmin,
        bookImageHandle.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'epub', maxCount: 1 }
          ]),
        // bookImageHandle.upload.any(),
        bookController.addBook
    )
    .patch(isAdmin,
        bookImageHandle.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'epub', maxCount: 1 }
          ]),
        bookController.updateBook
    )
    .delete(isAdmin,bookController.deleteBook);

module.exports = router;