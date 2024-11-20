import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookheaven-ovxg.onrender.com/api/v1/user-info",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 text-white py-8 md:px-12 px-2 gap-4 flex md:flex-row flex-col h-auto lg:h-[100%] w-full">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
