const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const publicDir = path.join(__dirname,"..", "Public//images");
    const categoryDir = path.join(__dirname, "..", "Public//images//category");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir);
    }
    cb(null, 'Public//images//category');
  },
  filename: function (req, file, cb) {
    const originalExtension = file.originalname.split(".").pop(); // Get the original file extension
    const fileName = `${uuidv4()}.${originalExtension}`; // Generate a unique file name with the original extension
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFiletypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFiletypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const uploadCategoryImage = multer({ storage, fileFilter });

module.exports = {
  uploadCategoryImage
};
