const { exec } = require("child_process");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

//book image
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "..", "uploads");
//     const bookDir = path.join(__dirname, "..", "uploads//book");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     if (!fs.existsSync(bookDir)) {
//       fs.mkdirSync(bookDir);
//     }
//     cb(null, bookDir);
//   },
//   filename: function (req, file, cb) {
//     const originalExtension = file.originalname.split(".").pop(); // Get the original file extension
//     const fileName = `${uuidv4()}.${originalExtension}`; // Generate a unique file name with the original extension
//     cb(null, fileName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFiletypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFiletypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const uploadBookImage = multer({ storage, fileFilter });

// const bookFileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "..", "uploads");
//     const bookDir = path.join(__dirname, "..", "uploads//book");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     if (!fs.existsSync(bookDir)) {
//       fs.mkdirSync(bookDir);
//     }
//     cb(null, bookDir);
//   },
//   filename: function (req, file, cb) {
//     const originalExtension = file.originalname.split(".").pop(); // Get the original file extension
//     const fileName = `${uuidv4()}.${originalExtension}`; // Generate a unique file name with the original extension
//     cb(null, fileName);
//   },
// });

// const bookFileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/epub+zip') {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Invalid file format. Only EPUB files are allowed.'),false);
//   }
// };

// const uploadBookFile = multer({ bookFileStorage, bookFileFilter });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for file uploads
    // console.log(file.fieldname);
    let uploadDir = "";
    let bookDir = "";
    if (file.fieldname === "epub") {
      uploadDir = path.join(__dirname, "..", "uploads");
      bookDir = path.join(__dirname, "..", "uploads//bookEpub");
    }
    if (file.fieldname === "image") {
      uploadDir = path.join(__dirname, "..", "uploads");
      bookDir = path.join(__dirname, "..", "uploads//bookImage");
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir);
    }
    cb(null, bookDir);
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
  // if (file.mimetype === 'application/epub+zip' || file.mimetype === 'image/jpeg') {
  //   cb(null, true); // Accept the file
  // } else {
  //   cb(new Error('Invalid file format. Only EPUB files are allowed.'),false);
  // }
};

// Create the multer middleware
const upload = multer({ storage: storage,FileFilter });

// module.exports = upload;

const deleteBookImage = async (filename) => {
  try {
    const uploadDir = path.join(__dirname, "..", "uploads//book");
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
  // uploadBookImage,
  deleteBookImage,
  // uploadBookFile,
  upload,
};
