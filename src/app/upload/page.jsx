"use client"
import React from "react";
import VideoUploadForm from "../component/VideoUploadForm";
import { useSession } from "next-auth/react";

const Upload = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="h-screen">
      <div className="m-5">
        {session ? (
          <VideoUploadForm uploaderId={session.user._id} />
        ) : (
          <p>Please log in to upload a video.</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
