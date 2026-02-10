import multer from "multer";

// Memory storage (Best for Cloudinary / S3)
const storage = multer.memoryStorage();

// Allowed mime types (more secure than startsWith)
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
]

// File filter
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only JPEG, PNG, JPG, and WEBP images are allowed"
      )
    );
  }

  cb(null, true);
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, //  2MB
    files: 5, // Max 5 images
  },
})

export default upload;