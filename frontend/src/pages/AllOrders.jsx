import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import SeeUser from "./SeeUser";


const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState(-1);
  const [value, setValue] = useState({status: ""});
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://bookheaven-ovxg.onrender.com/api/v1/get-all-orders`,
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [allOrders]);


  const change = (e) => {
    const {value} = e.target;
    setValue({status: value});
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `https://bookheaven-ovxg.onrender.com/api/v1/update-status/${id}`,
      value,
      {headers}
    );
    alert(response.data.message);
  };

  return (
    <div className="min-h-screen p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        All Orders
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zinc-100"></div>
        </div>
      ) : allOrders.length === 0 ? (
        <div className="text-center text-zinc-400 h-[60vh] flex items-center justify-center">
          No orders found
        </div>
      ) : (
        <>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {allOrders.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 cursor-pointer transition-all duration-300">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  className="hover:text-blue-300"
                  to={`/view-book-details/${items.book._id}`}
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button onClick={() => setOptions(i)} className="hover:scale-105 transition-all duration-300">
                  {items.status === "Order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div className={`${options === i ? "flex" : "hidden"}`}>
                    <select onChange={change} value={value.status} name="status" id="" className="bg-gray-800">
                      {[
                        "Order placed",
                        "Cancelled",
                        "Delivered",
                        "Out for delivery",
                      ].map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                      ))}
                    </select>
                    <button onClick={() => {
                      setOptions(-1);
                      submitChanges(i);
                    }} className="text-gray-500 hover:text-pink-600 mx-2">
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(items.user);
                }} className="text-xl hover:text-orange-500">
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {userDivData && (
        <SeeUser
          userDiv={userDiv}
          setUserDiv={setUserDiv}
          userDivData={userDivData}
        />
      )}
    </div>
  );
};

export default AllOrders;
