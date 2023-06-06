const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const deleteFile = require("../utils/deleteFile");
const Rating = require("../models/Rating");
const Library = require("../models/Library");
const User = require("../models/User");
const {ObjectId} = require('mongodb');

// @desc get all books
// @route GET/books
// @access private
const getAllBook = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find().select().lean().populate({
            path: 'category',
            select:
                'name',
        });
        if (!books) {
            return res.status(400).json({
                message: "No Books Found",
            });
        }
        const bookWithRatings = await Promise.all(
            books.map(async (book) => {
                const ratings = await Rating.find({ book: book._id }).select("rating review").lean().exec();
                const avgRating = ratings.reduce((a, { rating }) => a + rating, 0) / ratings.length
                return { ...book, avgRating: !isNaN(avgRating) ? avgRating : 0 };
            })
        );
        res.json(bookWithRatings);
    } catch (error) {
        console.error("Error getAllBook:", error);
        res.status(500).json({ message: "Failed to get all Book" });
    }
});

const getBook = asyncHandler(async (req, res) => {
    const id = req.params?.id
    const userObj = await User.findOne({ email: req.user }).select('email').lean().exec();
    const book = await Book.findById(id).select().lean().populate({
        path: 'category',
        select:
            'name',
    });
    if (!book) {
        return res.status(400).json({
            message: "No Book Found",
        });
    }
    const ratings = await Rating.find({ book: book._id }).lean().populate({
        path: 'user',
        select:
            'name',
    });

    const userRating = ratings.find(rating => rating.user._id.equals(userObj._id))

    const otherRatings = ratings.filter(rating => !rating.user._id.equals(userObj._id))

    const avgRating = ratings.reduce((a, { rating }) => a + rating, 0) / ratings.length
    const bookObj = { ...book, avgRating: !isNaN(avgRating) ? avgRating : 0, ratings: otherRatings, userRating }
    res.json(bookObj);
})

// @desc create new Book
// @route POST/books
// @access private
const addBook = asyncHandler(async (req, res) => {
    const imageFile = (req.files['image'] !== undefined) ? req.files['image'][0] : null
    const epubFile = (req.files['epub'] !== undefined) ? req.files['epub'][0] : null
    try {

        const { title, author, description, category, isFree, price, publication_date } = req.body;


        //handle some values
        const isFreeVal = isFree == "true";
        var priceVal = Number(price)
        const dateVal = new Date(publication_date)

        if (!epubFile) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            return res.status(400).json({ message: "Epub File Required", });
        }
        //confirm data
        if (!title || !author || !description || !category) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            return res.status(400).json({ message: "Fields are required", });
        }
        //check for duplicates
        const duplicate = await Book.findOne({ title }).lean().exec();
        if (duplicate) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            return res.status(409).json({ message: "Book already exist!" });
        }
        const categoryData = await Category.findOne({ _id: category }).exec();
        if (!categoryData) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            return res.status(401).json({ message: "Category not exist!", });
        }

        const bookObj = {
            title,
            author,
            description,
            category,
            isFree: isFreeVal,
            price: isFreeVal ? 0 : priceVal,
            publication_date: dateVal,
            image: imageFile ? imageFile.filename : null,
            imagePath: imageFile ? imageFile.destination.replace('Public', '') : null,
            bookFile: epubFile.filename,
            bookFilePath: epubFile.destination.replace('Public', ''),
        };
        //create and store Book
        const book = Book.create(bookObj);
        if (book) {
            //created
            res.status(200).json({ message: "Book successfully created", });
        } else {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            res.status(400).json({ message: "Invalid Book data received", });
        }
    } catch (error) {
        console.error("Error addBook:", error);
        if (imageFile) {
            await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
        }
        if (epubFile) {
            await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
        }
        res.status(500).json({ message: "Failed to add Book" });
    }
});

// @desc update Book
// @route PATCH/Book
// @access private
const updateBook = asyncHandler(async (req, res) => {
    const imageFile = (req.files['image'] !== undefined) ? req.files['image'][0] : null
    const epubFile = (req.files['epub'] !== undefined) ? req.files['epub'][0] : null
    try {

        const { id, title, author, description, category, isFree, price, publication_date } = req.body;
        const isFreeVal = isFree == "true";
        var priceVal = Number(price)
        const dateVal = new Date(publication_date)
        //confirm data
        if (!id || !title || !author || !description || !category) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            res.status(400).json({ message: "Fields are required" });
        }

        const book = await Book.findById(id).exec();
        const old_img = book.image;
        const old_imgPath = book.imagePath;
        const old_file = book.bookFile;
        const old_filePath = book.bookFilePath;
        if (!book) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            res.status(400).json({ message: "Book not Found" });
        }
        //check for duplicate
        const duplicate = await Book.findOne({ title }).lean().exec();
        //Allow updates to the original user
        if (duplicate && duplicate._id.toString() !== id) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            return res.status(409).json({ message: "Book already Exist!" });
        }
        const categoryData = await Category.findOne({ _id: category }).exec();
        if (!categoryData) {
            if (imageFile) {
                await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
            }
            if (epubFile) {
                await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
            }
            return res.status(401).json({ message: "Category not exist!", });
        }
        book.title = title;
        book.author = author;
        book.description = description;
        book.category = category;
        book.isFree = isFreeVal;
        book.price = isFreeVal ? 0 : priceVal;
        book.publication_date = dateVal;
        book.image = imageFile ? imageFile.filename : old_img;
        book.imagePath = imageFile ? imageFile.destination.replace('Public', '') : old_imgPath;
        book.bookFile = epubFile ? epubFile.filename : old_file;
        book.bookFilePath = epubFile ? epubFile.destination.replace('Public', '') : old_filePath;
        //update Book
        const updatedBook = await book.save();
        if (imageFile && old_img != updateBook.image) {
            await deleteFile(old_img, old_imgPath)
        }
        if (epubFile && old_file != updateBook.bookFile) {
            await deleteFile(old_file, old_filePath)
        }
        res.status(200).json({ message: `${updatedBook.title} successfully updated` });
    } catch (error) {
        if (imageFile) {
            await deleteFile(imageFile, imageFile.destination.replace('Public', ''))
        }
        if (epubFile) {
            await deleteFile(epubFile, epubFile.destination.replace('Public', ''))
        }
        console.error("Error updateBook:", error);
        res.status(500).json({ message: "Failed to update Book" });
    }
});

// @desc delete Book
// @route DELETE/Book
// @access private
const deleteBook = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Book required" });
        }
        const book = await Book.findById(id).exec();
        const { image, imagePath, bookFile, bookFilePath } = book
        if (!book) {
            return res.status(400).json({ message: " Book not found" });
        }
        const result = await book.deleteOne();
        if (result) {

            await Rating.deleteMany({ book: id });
            await Library.deleteMany({ book: id });
        }
        if (image) {
            await deleteFile(image, imagePath)

        }
        if (bookFile) {
            await deleteFile(bookFile, bookFilePath)
        }
        res.status(200).json({ message: `Book ${result.title} deleted` });
    } catch (error) {
        console.error("Error deleteBook:", error);
        res.status(500).json({ message: "Failed to delete Book" });
    }
});

module.exports = {
    getAllBook,
    getBook,
    addBook,
    updateBook,
    deleteBook,
};
