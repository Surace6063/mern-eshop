import cloudinary from "../config/cloudinary.js";

export const deleteFromCloudinary = (publicId) => {
    return  new Promise((resolve, reject) => {
    if (!publicId) return resolve({ message: "No public_id provided" });

    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}