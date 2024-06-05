"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import SideBarVideoCard from "./SideBarVideoCard";

const SideBar = () => {
  const [allVideoData, setAllVideo] = useState(null);
  useEffect(() => {
    const fetchAllVideo = async () => {
      try {
        const videos = await axios.get("/api/video/allvideo");
        setAllVideo(videos.data.videos);
        console.log("sidebar", videos);
      } catch (error) {
        console.log(error, "failed to get all videos");
      } finally {
      }
    };
    fetchAllVideo();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {allVideoData?.map((videodata) => (
          <SideBarVideoCard key={videodata?.title} videodata={videodata} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
