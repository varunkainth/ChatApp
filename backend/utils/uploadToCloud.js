// uploadToCloudinary.js
import cloudinary from '../config/cloudinary.js'; // Adjust the path as per your file structure
import fs from 'fs';

const uploadToCloudinary = async (filepath, username) => {
  try {
    // Ensure username is sanitized or validated as needed

    // Create folder structure in Cloudinary
    const folder = `images/${username}/`;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      folder: folder,
      resource_type: 'image' // Specify resource type as 'image'
    });

    // Save file URL and metadata to database (example using console.log)
    console.log('Uploaded:', result.url);
    console.log('Public ID:', result.public_id);
    console.log('Secure URL:', result.secure_url);

    // Optionally, you can delete the local file after uploading
    fs.unlinkSync(file.path);

    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error uploading file');
  }
};

export default uploadToCloudinary;
