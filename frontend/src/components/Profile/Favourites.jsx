import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouritesBooks, setFavouritesBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookheaven-ovxg.onrender.com/api/v1/get-all-favourite-books`,
        { headers }
      );
      setFavouritesBooks(response.data.data);
    };
    fetch();
  }, [favouritesBooks]);

  return (
    <>
      {favouritesBooks && favouritesBooks.length === 0 && (
        <div className="text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center w-full ">
          No Favourite Books
        </div>
      )}
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 ">
        {favouritesBooks &&
          favouritesBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
