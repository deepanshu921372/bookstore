import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { useParams } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 md:flex-row flex-col">
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
            <img src={data?.url} alt="url" className="h-[50vh] lg:h-[70vh] rounded" />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data?.title}
            </h1>
            <p className="text-zinc-400 mt-1">{data?.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data?.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {data?.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹{data?.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="flex justify-center items-center h-screen bg-zinc-900">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
