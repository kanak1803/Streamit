"use client";
import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoUploadForm = ({ uploaderId }) => {
  const initialState = {
    title: "",
    description: "",
    category: "OTHER",
    url: "",
    thumbnail: "",
    likes: [],
    comments: [],
  };

  const [video, setVideo] = useState(initialState);
  const [videofile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      //uploading to cloudinary
      const formData = new FormData();
      formData.append("file", videofile);
      formData.append("upload_preset", "streamit_videos");

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dyp6swbrc/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (uploadResponse.status === 200) {
        console.log(uploadResponse);
        const videoURL = uploadResponse.data.secure_url;
        // Generate thumbnail URL by using video url as reference
        const thumbnailURL = `https://res.cloudinary.com/dyp6swbrc/video/upload/so_auto,w_375,h_300,c_pad/${uploadResponse.data.public_id}.jpg`;

        console.log(videoURL, "VIDEOURL");
        console.log(thumbnailURL, "thumbnailURL");
        //creating video in mongodb database
        const createResponse = await axios.post("/api/video/createvideo", {
          ...video,
          url: videoURL,
          thumbnail: thumbnailURL,
          uploader: uploaderId,
        });
        if (createResponse.status === 200) {
          setSuccess("Video uploaded successfully");
          setError(null);
          setVideo(initialState); // Reset form
          toast.success("Video uploaded successfully"); // Toast success message
        } else {
          setError("Error uploading video");
          toast.error("Error uploading video"); // Toast error message
        }
      } else {
        setError("Error uploading video to cloudinary");
      }
    } catch (error) {
      setError("Error uploading video: " + error.message);
      setSuccess(null);
      toast.error("Error uploading video: " + error.message); // Toast error message
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div>
      <form
        className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center special-word">Upload Video</h2>
        <div>
          <Input
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            label="Title"
            placeholder="Enter video title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <TextArea
            rows="2"
            name="description"
            id="description"
            placeholder="Write video details..."
            value={video.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            id="category"
            name="category" // Use name attribute here
            value={video.category}
            onChange={handleChange}
            required
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="MUSIC">MUSIC</option>
            <option value="GAMING">GAMING</option>
            <option value="COMEDY">COMEDY</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="SPORTS">SPORTS</option>
            <option value="FITNESS">FITNESS</option>
            <option value="LIFESTYLE">LIFESTYLE</option>
            <option value="TECHNOLOGY">TECHNOLOGY</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div>
          <label htmlFor="file" className="block">
            Video File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          />
        </div>
        <button className="btn w-full" type="submit">
          {loading ? "Uploading Video..." : "Upload Video"}
        </button>
        {loading && (
          <div className="progress-bar  ">
            <div
              className="progress"
              style={{ width: `${progress}%`, backgroundColor: "green" }}
            ></div>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default VideoUploadForm;
