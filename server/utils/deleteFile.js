const fs = require('fs');
const path = require('path');

const deleteFile = async (filename,fileDestination) => {
    try {
      const uploadDir = path.join(__dirname, "..", `Public${fileDestination}`);
      const filepath = `${uploadDir}\\${filename}`;
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      console.log("Delete Image successfully.");
    } catch (error) {
      console.log(error);
    }
  };

module.exports = deleteFile;