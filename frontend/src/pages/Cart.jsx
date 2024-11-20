import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://bookheaven-ovxg.onrender.com/api/v1/get-user-cart",
        {
          headers,
        }
      );
      setCart(res.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://bookheaven-ovxg.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
    const res = await axios.get("https://bookheaven-ovxg.onrender.com/api/v1/get-user-cart", {
      headers,
    });
    setCart(res.data.data);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((item) => {
        total += item.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "https://bookheaven-ovxg.onrender.com/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 py-8 h-screen">
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader /> {" "}
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl font-semibold lg:text-6xl text-zinc-400">
              Cart Is Empty
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div
              key={i}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                src={items.url}
                alt=""
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <Link
                  onClick={() => deleteItem(items._id)}
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                >
                  <AiFillDelete />
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} books</h2> <h2>₹ {total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                onClick={PlaceOrder}
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-600 hover:text-white transition-all duration-300"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
