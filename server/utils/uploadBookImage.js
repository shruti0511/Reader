const { exec } = require("child_process");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = "";
    let bookpath = "";
    if (file.fieldname === "epub") {
      uploadDir = path.join(__dirname, "..", "Public//files");
      bookpath =  "Public//files//bookEpub"

    }
    if (file.fieldname === "image") {
      uploadDir = path.join(__dirname, "..", "Public//images");
      bookpath =  "Public//images//books"
    }
    const bookDir = path.join(__dirname, "..", bookpath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir);
    }
    cb(null, bookpath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const originalExtension = file.originalname.split(".").pop(); // Get the original file extension
    const fileName = `${uuidv4()}.${originalExtension}`; // Generate a unique file name with the original extension
    cb(null, fileName);
  },
});
const FileFilter = (req, file, cb) => {
  console.log(file.fieldname);
  const allowedFiletypes = ["image/jpeg", "image/jpg", "image/png","application/epub+zip"];
  if (allowedFiletypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Create the multer middleware
const upload = multer({ storage: storage,FileFilter });

const deleteBookImage = async (filename) => {
  try {
    const uploadDir = path.join(__dirname, "..", "Public//images//books");
    const filepath = `${uploadDir}\\${filename}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.log("Delete Image successfully.");
  } catch (error) {
    console.log(error);
  }
};

const deleteBookEpub = async (filename) => {
  try {
    const uploadDir = path.join(__dirname, "..", "Public//files//bookEpub");
    const filepath = `${uploadDir}\\${filename}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.log("Delete File successfully.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  upload,
  deleteBookImage,
  deleteBookEpub
};
