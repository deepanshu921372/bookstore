import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/add-to-cart`,
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      `http://localhost:1000/api/v1/delete-book`,
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 md:flex-row flex-col">
          <div className="bg-zinc-800 rounded px-4 py-12  w-full lg:w-4/6 flex flex-col lg:flex-row justify-around gap-8">
            {" "}
            <img
              src={data?.url}
              alt="url"
              className="h-[50vh] lg:h-[70vh] rounded"
            />
            {isLoggedIn === true && role === "user" && (
              <div className="flex gap-4 items-center justify-center lg:justify-start md:flex-col">
                <button
                  className="bg-white rounded-full text-red-500 text-3xl p-2"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                </button>
                <button
                  className="bg-white rounded-full text-3xl text-blue-500 p-2 lg:mt-4"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="flex gap-4 items-center md:flex-col">
                <Link to={`/update-book/${id}`} className="bg-white rounded-full text-3xl p-2">
                  <FaEdit />{" "}
                </Link>
                <button className="bg-white rounded-full text-3xl text-red-500 p-2 lg:mt-4" onClick={deleteBook}>
                  <MdOutlineDelete />
                </button>
              </div>
            )}
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
