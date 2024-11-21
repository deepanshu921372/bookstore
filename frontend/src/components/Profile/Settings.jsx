import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [profileData, setProfileData] = useState();
  const [value, setValue] = useState({ address: "" });

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
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "https://bookheaven-ovxg.onrender.com/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold">Settings</h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              name="address"
              cols="30"
              rows="5"
              value={value.address}
              placeholder="Address"
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={submitAddress}
              className="bg-yellow-500 hover:cursor-pointer text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
