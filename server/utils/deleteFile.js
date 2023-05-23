const fs = require('fs');

const deleteFile = (filepath) => {
    return new Promise((resolve, reject) => {
            fs.unlink(filepath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
};

module.exports = deleteFile;