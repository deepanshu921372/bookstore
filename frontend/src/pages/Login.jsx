import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full rounded bg-blue-500 text-white font-semibold py-2 hover:bg-blue-600 transition-all duration-300">
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
