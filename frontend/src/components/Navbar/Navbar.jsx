import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All-Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="bg-zinc-800 relative z-50 text-white px-8 py-4 flex justify-between items-center">
        <Link className="flex items-center" to="/">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center ">
                {items.title === "Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 border border-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <>
              <div className="hidden md:flex gap-4">
                <Link
                  to="/Login"
                  className="px-4 py-1 border border-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="bg-blue-500 px-4 py-1 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
          <button
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="block md:hidden text-2xl text-white hover:text-zinc-400"
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 absolute top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${mobileNav} hover:text-blue-500 text-white text-4xl font-semibold mb-8 transition-all duration-300`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/Login"
              className={`${mobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded-md hover:bg-white text-white hover:text-zinc-800 transition-all duration-300`}
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className={`${mobileNav} bg-blue-500 text-3xl font-semibold mb-8 px-8 py-2 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300`}
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
