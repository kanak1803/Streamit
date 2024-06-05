"use client";
import VideoPlayer from "@/app/component/VideoPlayer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SideBar from "@/app/component/SideBar";
import LikeButton from "@/app/component/LIkeButton";
import CommentForm from "@/app/component/CommentForm";

const VideoDetail = ({ params }) => {
  const { id } = params;
  const { data: session, status } = useSession();
  const [video, setVideo] = useState({ comments: [], likes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoMeta = await axios.get(`/api/video/getvideo/${id}`);
        setVideo(videoMeta?.data?.video);
        console.log(videoMeta?.data);
      } catch (error) {
        console.error("Failed to load video", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    if (!session) {
      alert("You need to be logged in to like a video.");
      return;
    }
    try {
      const response = await axios.post(`/api/video/getvideo/${id}/like`, {
        userId: session?.user?._id,
      });
      setVideo(response.data); // Update video state after successful like
      console.log("like:", video);
    } catch (error) {
      console.error("Failed to like the video", error);
    }
  };

  const handleUnlike = async () => {
    if (!session) {
      alert("You need to be logged in to unlike a video.");
      return;
    }
    try {
      const response = await axios.post(`/api/video/getvideo/${id}/unlike`, {
        userId: session?.user?._id,
      });
      setVideo(response.data); // Update video state after successful unlike
      console.log("unlike:", video);
    } catch (error) {
      console.error("Failed to unlike the video", error);
    }
  };

  const handleCommentSubmit = async (commentText) => {
    if (!session) {
      alert("You need to be logged in to comment.");
      return;
    }
    try {
      const response = await axios.post(`/api/video/getvideo/${id}/comment`, {
        userId: session?.user?._id,
        username: session?.user?.username,
        comment: commentText,
      });
      setVideo(response.data); // Update video state after adding comment
      console.log("comment", video);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div>Failed to load video</div>;

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      <div className="flex w-full">
        <div className="w-full max-w-4xl flex flex-col items-start ml-10 bg-base-300 rounded-box p-6 shadow-md">
          {video && (
            <>
              <VideoPlayer videoUrl={video?.url} />
              <div className="flex items-center justify-between w-full mt-4">
                <h3 className="text-2xl font-bold">{video?.title}</h3>
                <LikeButton
                  isLiked={video?.likes?.includes(session?.user?._id)}
                  onLike={handleLike}
                  onUnlike={handleUnlike}
                  totalLike={video?.likes?.length}
                />
              </div>
              <p className="text-base mt-2">{video?.description}</p>
              <div className="flex items-center mt-4">
                <div className="avatar flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-4 mt-5">
                    <p className="text-lg font-medium">
                      {video.uploader && (
                        <p className="text-gray-200">
                          {video?.uploader?.username}
                        </p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {video?.comments?.length > 0 && (
                  <div className="mt-6 w-full">
                    <h4 className="text-xl font-semibold mb-2">Comments:</h4>
                    {video?.comments?.map((comment, index) => (
                      <div
                        key={index}
                        className=" p-4 rounded-lg shadow-sm mb-2"
                      >
                        <p className="text-sm">{comment?.comment}</p>
                        <p className="text-xs text-gray-600">
                          By: {comment?.username}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <CommentForm onSubmit={handleCommentSubmit} />
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:w-1/4 h-screen bg-base-300 rounded-box p-4 ">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
