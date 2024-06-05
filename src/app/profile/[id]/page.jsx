"use client";
import VideoCard from "@/app/component/VideoCard";
import uploadAvatarToCloudinary from "@/utils/cloudinaryUpload";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Profile = ({ params }) => {
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/userprofile/${id}`);
        setUserData(response.data.user);
        setUserVideos(response.data.videos);
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
      } catch (error) {
        console.error("Failed to fetch user details from DB", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      let avatarUrl = userData.avatar;
      // Upload new avatar to Cloudinary if a file is selected
      if (avatar) {
        avatarUrl = await uploadAvatarToCloudinary(avatar);
      }
      const updateData = {
        username,
        email,
        avatar: avatarUrl,
      };
      await axios.put(`/api/userprofile/${id}`, updateData);
      // Refresh user data
      const response = await axios.get(`/api/userprofile/${id}`);
      setUserData(response.data.user);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      window.location.reload();
    }
  };

  const handleDelete = (videoId) => {
    setUserVideos(userVideos.filter((video) => video._id !== videoId));
    toast.error("Video deleted");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // if (loading)
  //   return (
  //     <div className="flex items-center justify-center h-screen ">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <motion.div
          className="profile-header flex flex-col items-center md:flex-row gap-6 md:gap-10  p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={`container mx-auto p-4`}>
            <div className="flex flex-col items-center">
              <div className="profile-header flex flex-col items-center md:flex-row gap-6 md:gap-10  p-6 rounded-lg shadow-lg">
                <div>
                  <Image
                    src={userData?.avatar}
                    width={150}
                    height={150}
                    alt="avatar"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold text-white">
                    {userData.username}
                  </h1>
                  <p className="text-lg text-gray-400 mt-2">{userData.email}</p>
                  <p className="text-md text-gray-400 mt-1">
                    Joined on: {formatDate(userData?.createdAt)}
                  </p>
                  <button
                    className="btn mt-4"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isModalOpen && (
                <>
                  <div className="blur-background"></div>
                  <motion.dialog
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.3 }}
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle bg-transparent"
                    open
                  >
                    <div className="modal-box bg-[#121D1E] z-20">
                      <h3 className="font-bold text-lg">Update Profile</h3>
                      <form onSubmit={handleUpdateProfile} className="mt-4">
                        <div className="mb-4">
                          <label className="block text-white mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-white mb-2">Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-white mb-2">
                            Avatar
                          </label>
                          <input
                            type="file"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
                          />
                        </div>
                        <div className="modal-action">
                          <button type="submit" className="btn">
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.dialog>
                </>
              )}
            </AnimatePresence>

            <div className="user-videos mt-10 lg:ml-8 ">
              <h2 className="text-3xl font-semibold text-center text-white mb-8">
                {userVideos.length === 0
                  ? "No videos Uploaded"
                  : "Uploaded Videos"}
              </h2>
              <div className="grid gap-8 grid-cols-1 sm:ml-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {userVideos?.map((videodata) => (
                  <VideoCard
                    key={videodata?._id}
                    videodata={videodata}
                    showDeleteButton={true}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;
