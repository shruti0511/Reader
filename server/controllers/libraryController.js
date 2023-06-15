const Library = require("../models/Library")
const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");
const User = require("../models/User");

// @desc get user Library
// @route GET/library
// @access private
const getUserLibrary = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user }).select("email").lean().exec()
        const userBooks = await Library.find({ user: user._id }).sort('-createdAt').lean()
            .populate({
                path: 'book',
                populate: {
                    path: 'author',
                    select:
                        'name',
                },
            });
        if (!userBooks) {
            return res.status(400).json({
                message: "No Book in Library",
            });
        }
        res.json(userBooks);
    } catch (error) {
        console.error("Error getUserLibrary:", error);
        res.status(500).json({ message: "Failed to get Library data" });
    }
});


// @desc add book in library
// @route POST/rating
// @access private
const addLibrary = asyncHandler(async (req, res) => {
    try {
        const { book } = req.body;
        const email = req.user;
        if (!email || !book) {
            return res.status(400).json({ message: "Fields are required", });
        }
        const userobj = await User.findOne({ email: email }).lean().exec()
        if (!userobj) {
            return res.status(409).json({ message: "User not exist!" });
        }
        const bookobj = await Book.findOne({ book }).lean().exec()
        if (!bookobj) {
            return res.status(409).json({ message: "Book not exist!" });
        }
        //check for duplicates
        const duplicate = await Library.findOne({ user: userobj._id, book }).lean().exec();
        if (duplicate) {

            return res.status(200).json({ message: "Book already in Library!" });
        }
        const library = {
            user: userobj._id,
            book
        };
        //create and store rating
        const libraryData = Library.create(library);
        if (libraryData) {
            //created
            res.status(200).json({ message: "Book added to library", });
        } else {

            res.status(400).json({ message: "Invalid  data received", });
        }
    } catch (error) {

        console.error("Error addLibrary:", error);
        res.status(500).json({ message: "Failed to add book in library" });
    }
});

// @desc remove book from library
// @route POST/rating
// @access private
const removeFromLibrary = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ message: "Data required" });
        }
        const library = await Library.findById(id).exec();
        if (!library) {
            return res.status(400).json({ message: " Data not found" });
        }
        const result = await library.deleteOne();

        res.status(200).json({ message: `Book removed suceessfully from library` });

    } catch (error) {

        console.error("Error removeFromLibrary:", error);
        res.status(500).json({ message: "Failed to remove book from library" });
    }
});

module.exports = {
    getUserLibrary,
    addLibrary,
    removeFromLibrary
};