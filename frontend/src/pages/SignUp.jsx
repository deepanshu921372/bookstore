import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-up",
          values
        );
        alert(response.data.message);
        navigate("/Login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[83vh] lg:h-[86vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              UserName
            </label>
            <input
              type="text"
              className="w-full rounded mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <textarea
              type="text"
              className="w-full rounded mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full rounded bg-blue-500 text-white font-semibold py-2 hover:bg-blue-600 transition-all duration-300"
            onClick={submit}
          >
            Sign Up
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Already have an account? &nbsp;
          <Link to="/Login" className="text-blue-500">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
