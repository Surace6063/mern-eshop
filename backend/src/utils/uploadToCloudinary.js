import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer,folderName) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: folderName }, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
        .end(fileBuffer)
    })
}