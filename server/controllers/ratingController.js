const Rating = require("../models/Rating");
const User = require("../models/User");
const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

// @desc get all ratings
// @route GET/ratings
// @access private
const getAllRatings = asyncHandler(async (req, res) => {
    try {
        const ratings = await Rating.find().lean();
        if (!ratings) {
            return res.status(400).json({
                message: "No Ratings Found",
            });
        }
        res.json(ratings);
    } catch (error) {
        console.error("Error getAllRatings:", error);
        res.status(500).json({ message: "Failed to get all ratings" });
    }
});

// @desc create new rating
// @route POST/rating
// @access private
const addRating = asyncHandler(async (req, res) => {
    try {
        const { rating,user,book,review } = req.body;

        if (!rating || !user || !book) {

            return res.status(400).json({ message: "Fields are required", });
        }
        //check for duplicates
        const duplicate = await Rating.findOne({ user,book }).lean().exec();
        if (duplicate) {

            return res.status(409).json({ message: "User has already added rating for this book!" });
        }
        const userobj = User.findOne({ user }).lean().exec()
        if (!userobj) {
            return res.status(409).json({ message: "User not exist!" });
        }
        const bookobj = Book.findOne({ book }).lean().exec()
        if (!bookobj) {
            return res.status(409).json({ message: "Book not exist!" });
        }
        const ratingObj = {
            rating,
            user,
            book,
            review
        };
        //create and store rating
        const ratingData = Rating.create(ratingObj);
        if (ratingData) {
            //created
            res.status(200).json({ message: "Rating successfully added", });
        } else {

            res.status(400).json({ message: "Invalid Ratings data received", });
        }
    } catch (error) {

        console.error("Error addRating:", error);
        res.status(500).json({ message: "Failed to add rating" });
    }
});

// @desc update rating
// @route PATCH/rating
// @access private
const updateRating = asyncHandler(async (req, res) => {
    try {

        const { id,rating,user,book,review } = req.body;
        //confirm data
        if (!id || !rating|| !user || !book) {

            res.status(400).json({ message: "Fields are required" });
        }

        const ratingData = await Rating.findById(id).exec();
        if (!ratingData) {

            res.status(400).json({ message: "Rating not Found" });
        }
        //check for duplicate
        const duplicate = await Category.findOne({ book, user }).lean().exec();
        //Allow updates to the original user
        if (duplicate && duplicate._id.toString() !== id) {

            return res.status(409).json({ message: "Rating from user for this book already Exist!" });
        }
        ratingData.rating = rating;
        ratingData.review = review;
        //update category
        const updatedRating = await ratingData.save();

        res.status(200).json({ message: `rating/review successfully updated` });
    } catch (error) {

        console.error("Error updateRating:", error);
        res.status(500).json({ message: "Failed to update rating" });
    }
});

// @desc delete Rating
// @route DELETE/Rating
// @access private
const deleteRating= asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Rating required" });
        }
        const rating = await Rating.findById(id).exec();
        if (!rating) {
            return res.status(400).json({ message: " Ratings not found" });
        }
        const result = await rating.deleteOne();

        res.json(`Rating deleted`);
    } catch (error) {
        console.error("Error deleteRating:", error);
        res.status(500).json({ message: "Failed to delete Rating" });
    }
});

module.exports = {
    getAllRatings,
    addRating,
    updateRating,
    deleteRating,
};
