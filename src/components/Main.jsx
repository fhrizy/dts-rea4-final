import React from "react";
import { http_get } from "../context/helper/axios";
import { BsCheckLg } from "react-icons/bs"

const Main = ({ movie }) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const redirectPlay = async () => {
    const renponse = await http_get(`/movie/${movie.id}/watch/providers`)
    window.open(renponse.data.results.US.link, "_blank");
  };

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button
              onClick={() => redirectPlay()}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-transparent hover:text-white"
            >
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4 hover:bg-gray-300 hover:text-black">
              {movie?.watchLater && <BsCheckLg className="text-white" />}
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
