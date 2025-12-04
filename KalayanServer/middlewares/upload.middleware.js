const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads";
    if (req.url.includes("/upload-media")) folder = "uploads/media";

    const uploadDir = path.join(__dirname, "../", folder);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

module.exports = multer({ storage });
