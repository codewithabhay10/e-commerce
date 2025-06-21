const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

module.exports = upload;
// This configuration uses memory storage for file uploads, which is suitable for small files.
// If you need to store files on disk or in a cloud service, you can modify the storage option accordingly
