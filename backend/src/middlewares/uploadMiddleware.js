// VidVibe//backend//src/middlewares/uploadMiddleware.js
const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/videos/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
    }
});

// Check file type
const checkFileType = (file, cb) => {
    const filetypes = /mp4|avi|mkv/;
    const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos only!');
    }
};

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

module.exports = upload;
