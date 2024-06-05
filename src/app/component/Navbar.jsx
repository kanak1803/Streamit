"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import { SearchContext } from "../SearchProvider";
import axios from "axios";

const Navbar = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  console.log(session);

  const handleShowDropdown = () => setShowDropdown(true);
  const handleHideDropdown = () => setShowDropdown(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `/api/userprofile/${session?.user?._id.toString()}`
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user details from DB", error);
      }
      console.log(userData);
    };
    fetchDetails();
  }, [session?.user?._id.toString()]);

  return (
    <div className="sticky top-0 z-50 bg-[#121D1E] shadow-md py-2 h-16 flex items-center justify-between px-4 md:px-8 mx-5 mt-2">
      <Link href="/">
        <h2 className="text-xl font-bold">
          Stream<span className="text-red-600">IT</span>
        </h2>
      </Link>
      <div className="flex-1 flex justify-center md:justify-center mx-4">
        <div className="form-control w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-[700px]"
          />
        </div>
      </div>
      <ul className="flex items-center gap-3">
        {session?.user ? (
          <>
            <li>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <Link
                    className="text-white font-semibold hover:text-gray-200"
                    href={`/profile/${session?.user?._id.toString()}`}
                  >
                    {userData?.username}
                  </Link>
                  <Image
                    onClick={handleShowDropdown}
                    src={userData?.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </div>

                {showDropdown && (
                  <div className="absolute top-10 right-0 bg-primaryColorLight p-5 shadow-lg rounded-lg">
                    <AiOutlineClose
                      onClick={handleHideDropdown}
                      className="w-full cursor-pointer"
                    />
                    <Link
                      onClick={handleHideDropdown}
                      href={`/upload`}
                      className="block w-full text-left mt-2"
                    >
                      Upload
                    </Link>

                    <Link
                      onClick={handleHideDropdown}
                      href={`/profile/${session?.user?._id.toString()}`}
                      className="block w-full text-left mt-2"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        handleHideDropdown();
                      }}
                      className="block w-full text-left mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Log In</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
