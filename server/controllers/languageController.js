const Language = require("../models/Language");
const asyncHandler = require("express-async-handler");
const xlsx = require('xlsx');

// @desc get all languages
// @route GET/languages
// @access private
const getAllLanguage = asyncHandler(async (req, res) => {
    try {
        const languages = await Language.find().sort('name').lean();
        if (!languages) {
            return res.status(400).json({
                message: "No Languages Found",
            });
        }
        res.json(languages);
    } catch (error) {
        console.error("Error getAllLanguage:", error);
        res.status(500).json({ message: "Failed to get all language" });
    }
});

// @desc create new language
// @route POST/language
// @access private
const addLanguage = asyncHandler(async (req, res) => {
    try {
        const { name, country } = req.body;
        if (!name || !country) {
            return res.status(400).json({ message: "fields are required", });
        }

        const languageObj = {
            name,
            country
        };
        //create and store language
        const language = Language.create(languageObj);
        if (language) {
            //created
            res.status(200).json({ message: "Language successfully created", });
        } else {

            res.status(400).json({ message: "Invalid language data received", });
        }
    } catch (error) {

        console.error("Error addLanguage:", error);
        res.status(500).json({ message: "Failed to add language" });
    }
});

// @desc update language
// @route PATCH/language
// @access private
const updateLanguage = asyncHandler(async (req, res) => {
    try {

        const { id, name, country } = req.body;

        //confirm data
        if (!id || !name || !country) {

            res.status(400).json({ message: "Fields are required" });
        }

        const language = await Language.findById(id).exec();

        if (!language) {

            res.status(400).json({ message: "Language not Found" });
        }

        language.name = name;
        language.country = country

        //update language
        const updatedLanguage = await language.save();

        res.status(200).json({ message: `${updatedLanguage.name} successfully updated` });
    } catch (error) {

        console.error("Error updateLanguage:", error);
        res.status(500).json({ message: "Failed to update language" });
    }
});

// @desc delete language
// @route DELETE/language
// @access private
const deleteLanguage = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Language required" });
        }
        const language = await Language.findById(id).exec();

        if (!language) {
            return res.status(400).json({ message: "Language not found" });
        }
        const result = await language.deleteOne();

        res.status(200).json({ message: `language ${result.name} with Id ${result._id} deleted` });
    } catch (error) {
        console.error("Error deleteLanguage:", error);
        res.status(500).json({ message: "Failed to delete language" });
    }
});

const addExcel = asyncHandler(async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
         const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        await Language.insertMany(jsonData);


        res.status(200).json({ message: "Language Data successfully imported", });
    } catch (error) {
        console.error('Error importing data:', error);
        res.status(500).send('Internal server error');
    }
})

module.exports = {
    getAllLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addExcel
};
