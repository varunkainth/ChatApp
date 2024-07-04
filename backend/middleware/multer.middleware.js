import multer from "multer";

const storage = multer.memoryStorage({
    filename: function(req, file, callback) {
        // Remove spaces from the original filename
        const originalname = file.originalname.replace(/\s+/g, '-');
        // Generate a unique name for the file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(originalname);
        const filename = path.basename(originalname, extension);
        callback(null, `${filename}-${uniqueSuffix}${extension}`);
    }
});

const upload = multer({ storage: storage });
export default upload