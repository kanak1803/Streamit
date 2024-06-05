"use client"
import React, { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import Category from "./Category";
import { SearchContext } from "../SearchProvider";
import { motion, AnimatePresence } from "framer-motion";

const HomeVideoSection = () => {
  const [allVideoData, setAllVideoData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { searchQuery } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllVideo = async () => {
      setIsLoading(true);
      try {
        let url = "/api/video/allvideo";
        if (selectedCategory) {
          url = `/api/video/category/${selectedCategory}`;
        }
        if (searchQuery) {
          url = `/api/video/search/${searchQuery}`;
        }

        const videos = await axios.get(url);
        setAllVideoData(videos.data.videos);
      } catch (error) {
        console.error(error, "failed to get all videos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllVideo();
  }, [selectedCategory, searchQuery]);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-10 p-4">
      <Category onCategorySelect={setSelectedCategory} />
      {isLoading ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"></div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <AnimatePresence>
            {allVideoData?.map((videodata) => (
              <motion.div
                key={videodata?._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <VideoCard key={videodata?._id} videodata={videodata} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default HomeVideoSection;
