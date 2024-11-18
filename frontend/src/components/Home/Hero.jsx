import React from "react";
import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <div className="h-[76.6vh] flex">
      <div className="lg:w-3/6 w-full flex flex-col items-center justify-center lg:items-start">
        <h1 className="lg:text-6xl text-4xl font-semibold text-yellow-100 lg:text-left text-center">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 lg:text-left text-center">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-8">
          <button className="text-yellow-100 lg:text-2xl text-xl font-semibold border border-yellow-100 rounded-full px-10 py-3 hover:bg-zinc-800">
            Discover Books
          </button>
        </div>
      </div>
      <div className="lg:w-3/6 w-full h-auto lg:h-[100%] flex items-center justify-center">
        <img src={hero} alt="hero" className="rounded-lg ml-10" />
      </div>
    </div>
  );
};

export default Hero;
