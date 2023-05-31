const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");
const categoryImageHandle = require("../utils/uploadCategoryImage");
const deleteFile = require("../utils/deleteFile");

// @desc get all categories
// @route GET/categories
// @access private
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find().lean();
        if (!categories) {
            return res.status(400).json({
                message: "No Category Found",
            });
        }
        res.json(categories);
    } catch (error) {
        console.error("Error getAllCategory:", error);
        res.status(500).json({ message: "Failed to get all category" });
    }
});

// @desc create new category
// @route POST/category
// @access private
const addCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;
        if (!name) {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            return res.status(400).json({ message: "Category Name is required", });
        }
        //check for duplicates
        const duplicate = await Category.findOne({ name, }).lean().exec();
        if (duplicate) {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            return res.status(409).json({ message: "Category already exist!" });
        }
        const categoryObj = {
            name,
            image: file ? file.filename : null,
            imagePath: file ? file.destination.replace('Public','') :null
        };
        //create and store category
        const category = Category.create(categoryObj);
        if (category) {
            //created
            res.status(200).json({ message: "Category successfully created", });
        } else {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            res.status(400).json({ message: "Invalid Category data received", });
        }
    } catch (error) {
        if (file) {
            await deleteFile(file.filename,file.destination.replace('Public',''))
        }
        console.error("Error addCategory:", error);
        res.status(500).json({ message: "Failed to add category" });
    }
});

// @desc update Category
// @route PATCH/Category
// @access private
const updateCategory = asyncHandler(async (req, res) => {
    try {

        const { id, name } = req.body;
        const file = req.file;
        //confirm data
        if (!id || !name) {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            res.status(400).json({ message: "Category name is required" });
        }

        const category = await Category.findById(id).exec();
        const old_img = category.image;
        const old_imgPath = category.imagePath;
        if (!category) {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            res.status(400).json({ message: "Category not Found" });
        }
        //check for duplicate
        const duplicate = await Category.findOne({ name }).lean().exec();
        //Allow updates to the original user
        if (duplicate && duplicate._id.toString() !== id) {
            if (file) {
                await deleteFile(file.filename,file.destination.replace('Public',''))
            }
            return res.status(409).json({ message: "Category already Exist!" });
        }
        category.name = name;
        category.image = file ? file.filename : category.image;
        category.imagePath= file ? file.destination.replace('Public','') :category.imagePath
        //update category
        const updatedCategory = await category.save();
        if (file && old_img != updateCategory.image) {
            if (file) {
                await deleteFile(old_img,old_imgPath)
            }
        }
        res.status(200).json({ message: `${updatedCategory.name} successfully updated` });
    } catch (error) {
        if (file) {
            await deleteFile(file.filename,file.destination.replace('Public',''))
        }
        console.error("Error updateCategory:", error);
        res.status(500).json({ message: "Failed to update category" });
    }
});

// @desc delete Category
// @route DELETE/Category
// @access private
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Category required" });
        }
        const category = await Category.findById(id).exec();
        const image = category.image
        const imagePath = category.imagePath
        if (!category) {
            return res.status(400).json({ message: " Category not found" });
        }
        const result = await category.deleteOne();
        if (image) {
            await deleteFile(image,imagePath)
        }
        res.json(`Category ${result.name} with Id ${result._id} deleted`);
    } catch (error) {
        console.error("Error deleteCategory:", error);
        res.status(500).json({ message: "Failed to delete category" });
    }
});

module.exports = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory,
};
