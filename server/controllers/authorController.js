const Author = require("../models/Author");
const asyncHandler = require("express-async-handler");
const xlsx = require('xlsx');
const Book = require("../models/Book");

// @desc get all authors
// @route GET/authors
// @access private
const getAllAuthor = asyncHandler(async (req, res) => {
    try {
        const authors = await Author.find().sort('name').lean();
        if (!authors) {
            return res.status(400).json({
                message: "No Authors Found",
            });
        }
        res.json(authors);
    } catch (error) {
        console.error("Error getAllAuthor:", error);
        res.status(500).json({ message: "Failed to get all author" });
    }
});

// @desc get all authors with books
// @route GET/authors/authors-book
// @access private
const getAuthorsWithbook = asyncHandler(async (req, res) => {
    try {
        const authors = await Author.find().sort('name').lean();
        if (!authors) {
            return res.status(400).json({
                message: "No Authors Found",
            });
        }
        const authorsWithbooks = await Promise.all(
            authors.map(async (author) => {
                const books = await Book.find({ author: author._id }).select("title image imagePath").sort('-createdAt').lean().exec();
                return {
                    ...author,
                    books: books
                };
            })
        );
        res.json(authorsWithbooks);
    } catch (error) {
        console.error("Error getAuthorsWithbook:", error);
        res.status(500).json({ message: "Failed to get authors with book" });
    }
});

// @desc create new author
// @route POST/author
// @access private
const addAuthor = asyncHandler(async (req, res) => {
    try {
        const { name,description } = req.body;

        if (!name || !description) {

            return res.status(400).json({ message: "fields are required", });
        }

        const authorObj = {
            name,
            description
        };
        //create and store author
        const author = Author.create(authorObj);
        if (author) {
            //created
            res.status(200).json({ message: "Author successfully created", });
        } else {

            res.status(400).json({ message: "Invalid author data received", });
        }
    } catch (error) {

        console.error("Error addAuthor:", error);
        res.status(500).json({ message: "Failed to add author" });
    }
});

// @desc update author
// @route PATCH/author
// @access private
const updateAuthor = asyncHandler(async (req, res) => {
    try {

        const { id, name, description } = req.body;

        //confirm data
        if (!id || !name || !description) {

            res.status(400).json({ message: "Fields are required" });
        }

        const author = await Author.findById(id).exec();

        if (!author) {

            res.status(400).json({ message: "Author not Found" });
        }

        author.name = name;
        author.description = description

        //update author
        const updatedAuthor = await author.save();

        res.status(200).json({ message: `${updatedAuthor.name} successfully updated` });
    } catch (error) {

        console.error("Error updateAuthor:", error);
        res.status(500).json({ message: "Failed to update author" });
    }
});

// @desc delete author
// @route DELETE/author
// @access private
const deleteAuthor = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Author required" });
        }
        const author = await Author.findById(id).exec();

        if (!author) {
            return res.status(400).json({ message: "Author not found" });
        }
        const result = await author.deleteOne();

        res.status(200).json({ message: `author ${result.name} with Id ${result._id} deleted` });
    } catch (error) {
        console.error("Error deleteAuthor:", error);
        res.status(500).json({ message: "Failed to delete author" });
    }
});

const importExcel = asyncHandler(async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
         const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        await Author.insertMany(jsonData);


        res.status(200).json({ message: "Author Data successfully imported", });
    } catch (error) {
        console.error('Error importing data:', error);
        res.status(500).send('Internal server error');
    }
})

module.exports = {
    getAllAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    importExcel,
    getAuthorsWithbook
};
