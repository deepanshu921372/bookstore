import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios";
import { useDispatch } from "react-redux";


const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "https://bookheaven-ovxg.onrender.com/api/v1/sign-in",
          values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[83vh] lg:h-[86vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
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
              required
              value={values.username}
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
          <button
            className="w-full rounded bg-blue-500 text-white font-semibold py-2 hover:bg-blue-600 transition-all duration-300"
            onClick={submit}
          >
            Login
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Don't have an account? &nbsp;
          <Link to="/SignUp" className="text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
