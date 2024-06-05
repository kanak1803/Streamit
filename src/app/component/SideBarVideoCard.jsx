"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
const SideBarVideoCard = ({ videodata }) => {
  const { data: session } = useSession();
  return (
    <div className="flex gap-4 p-4 ml-20  ">
      <Link href={`/videodetail/${videodata?._id}`}>
        <div className="block w-52 h-28 relative">
          <Image
            src={videodata?.thumbnail || "/default_thumbnail.png"}
            alt={videodata?.title || "Video thumbnail"}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold line-clamp-2 w-[200px]">{videodata?.title}</h2>
        <p className="text-sm text-gray-400">{videodata?.uploader?.username}</p>
      </div>
    </div>
  );
};

export default SideBarVideoCard;
