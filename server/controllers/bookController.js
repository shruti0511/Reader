const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const bookImageHandle = require("../utils/uploadBookImage")

// @desc get all books
// @route GET/books
// @access private
const getAllBook = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find().lean();
        if (!books) {
            return res.status(400).json({
                message: "No Books Found",
            });
        }
        res.json(books);
    } catch (error) {
        console.error("Error getAllBook:", error);
        res.status(500).json({ message: "Failed to get all Book" });
    }
});

// @desc create new Book
// @route POST/books
// @access private
const addBook = asyncHandler(async (req, res) => {
    try {

        const { title, author, description, category, isFree, price, year } = req.body;
        const imageFile = (req.files['image'] !== undefined)?req.files['image'][0]:null
        const epubFile = (req.files['epub'] !== undefined)?req.files['epub'][0]:null

        //handle some values
        const isFreeVal = isFree == "true";
        var priceVal = Number(price)
        const yearVal = Number(year)

        if (!epubFile) {
            if (imageFile) {
                await bookImageHandle.deleteBookImage(imageFile)
            }
            return res.status(400).json({ message: "Epub File Required", });
        }
        //confirm data
        if (!title || !author || !description || !category) {
            if (imageFile) {
                await bookImageHandle.deleteBookImage(imageFile)
            }
            if (epubFile) {
                await bookImageHandle.deleteBookImage(epubFile)
            }
            return res.status(400).json({ message: "Fields are required", });
        }
        //check for duplicates
        const duplicate = await Book.findOne({ title }).lean().exec();
        if (duplicate) {
            if (imageFile) {
                await bookImageHandle.deleteBookImage(imageFile)
            }
            if (epubFile) {
                await bookImageHandle.deleteBookImage(epubFile)
            }
            return res.status(409).json({ message: "Book already exist!" });
        }
        const categoryData = await Category.findOne({ _id: category }).exec();
        if (!categoryData) {
            if (imageFile) {
                await bookImageHandle.deleteBookImage(imageFile)
            }
            if (epubFile) {
                await bookImageHandle.deleteBookImage(epubFile)
            }
            return res.status(401).json({ message: "Category not exist!", });
        }

        if (isFreeVal) {
            priceVal = 0
        }
        const bookObj = {
            title,
            author,
            description,
            category,
            isFree: isFreeVal,
            price: priceVal,
            year: yearVal,
            image: imageFile ? imageFile.filename : null,
            bookFile: epubFile ? epubFile.filename : null,
        };
        //create and store Book
        const book = Book.create(bookObj);
        if (book) {
            //created
            res.status(200).json({ message: "Book successfully created", });
        } else {
            if (imageFile) {
                await bookImageHandle.deleteBookImage(imageFile)
            }
            if (epubFile) {
                await bookImageHandle.deleteBookImage(epubFile)
            }
            res.status(400).json({ message: "Invalid Book data received", });
        }
    } catch (error) {
        console.error("Error addBook:", error);
        if (imageFile) {
            await bookImageHandle.deleteBookImage(imageFile)
        }
        if (epubFile) {
            await bookImageHandle.deleteBookImage(epubFile)
        }
        res.status(500).json({ message: "Failed to add Book" });
    }
});

// @desc update Book
// @route PATCH/Book
// @access private
const updateBook = asyncHandler(async (req, res) => {
    try {

        const { id, title, author, description, category, isFree, price, year } = req.body;
        const file = req.file;
        //confirm data
        if (!id || !title || !author || !description || !category) {
            if (file) {
                await bookImageHandle.deleteBookImage(file.filename)
            }
            res.status(400).json({ message: "Fields are required" });
        }

        const book = await Book.findById(id).exec();
        const old_img = book.image;
        if (!book) {
            if (file) {
                await bookImageHandle.deleteBookImage(file.filename)
            }
            res.status(400).json({ message: "Book not Found" });
        }
        //check for duplicate
        const duplicate = await Book.findOne({ title }).lean().exec();
        //Allow updates to the original user
        if (duplicate && duplicate._id.toString() !== id) {
            if (file) {
                await bookImageHandle.deleteBookImage(file.filename)
            }
            return res.status(409).json({ message: "Book already Exist!" });
        }
        const categoryData = await Category.findOne({ _id: category }).exec();
        if (!categoryData) {
            if (file) {
                await bookImageHandle.deleteBookImage(file.filename)
            }
            return res.status(401).json({ message: "Category not exist!", });
        }
        book.title = title;
        book.author = author;
        book.description = description;
        book.category = category;
        book.isFree = isFree;
        book.price = price;
        book.year = year;
        book.image = file ? file.filename : book.image;
        book.bookFile = null
        //update Book
        const updatedBook = await book.save();
        if (file && old_img != updateBook.image) {
            await bookImageHandle.deleteBookImage(old_img)
        }
        res.status(200).json({ message: `${updatedBook.title} successfully updated` });
    } catch (error) {
        if (file) {
            await bookImageHandle.deleteBookImage(file.filename)
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
        const image = book.image
        if (!book) {
            return res.status(400).json({ message: " Book not found" });
        }
        const result = await book.deleteOne();
        if (image) {
            await bookImageHandle.deleteBookImage(image)
        }
        res.json(`Book ${result.name} with Id ${result._id} deleted`);
    } catch (error) {
        console.error("Error deleteBook:", error);
        res.status(500).json({ message: "Failed to delete Book" });
    }
});

module.exports = {
    getAllBook,
    addBook,
    updateBook,
    deleteBook,
};
