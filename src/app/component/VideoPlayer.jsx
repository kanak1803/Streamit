"use client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="flex justify-center items-center w-full h-auto p-4">
      {videoUrl && (
        <div className="w-full max-w-[853px] aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
          <CldVideoPlayer
            src={videoUrl}
            className="w-full h-full"
            width="853"
            height="480"
            colors={{
              accent: "#ff0000",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
