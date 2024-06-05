"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const VideoCard = ({ videodata, onDelete, showDeleteButton }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/video/delete/${videodata?._id}`);
      onDelete(videodata._id);
    } catch (error) {
      console.error("Failed to delete video", error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="card w-[380px] mx-2 my-4 bg-gray-800 shadow-xl transform transition duration-300"
    >
      <figure className="relative w-full h-0 pb-[56.25%] overflow-hidden">
        <Link href={`/videodetail/${videodata?._id}`}>
          <Image
            src={videodata?.thumbnail || "/default_thumbnail.png"}
            alt={videodata?.title}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 ease-in-out hover:opacity-75"
          />
        </Link>
      </figure>
      <div className="card-body p-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={videodata?.uploader?.avatar}
              alt="Uploader Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="card-title text-lg font-semibold">
              {videodata?.title}
            </h2>
            <p className="text-sm text-gray-400">
              {videodata?.uploader?.username}
            </p>
          </div>
        </div>
        {showDeleteButton && (
          <div className="flex justify-end ">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
              onClick={handleDelete}
            >
              Delete
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;
