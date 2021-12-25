//  basic file management
const path = require("path");
const fs = require("fs");
const process = require("process");

// console.log(process.cwd());
// console.log(path.basename(process.cwd()));

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
};
