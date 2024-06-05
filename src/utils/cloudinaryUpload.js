const { default: axios } = require("axios");

const uploadAvatarToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "streamit_videos");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dyp6swbrc/image/upload`,
    formData
  );
  return response.data.secure_url; // Return the secure URL of the uploaded image
};

export default uploadAvatarToCloudinary;
