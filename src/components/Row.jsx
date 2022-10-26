import React from 'react';
import Movie from './Movie';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ movie, index }) => {
  const url = movie.fetchURL?.split('?')[0];
  const link = url?.split("/")[0] === "search" ? 
    { pathname: `movie/search`, search: `?query=${movie?.title?.toLowerCase()}&rowID=${index}` } : 
    { pathname: url, search: `?rowID=${index}` };

  const slideLeft = () => {
    var slider = document.getElementById('slider' + index);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + index);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-white font-bold md:text-xl p-4'>{movie.title}</h2>
        <Link to={link}>
          <span className='text-white md:text-xs px-4 cursor-pointer hover:underline'>More...</span>
        </Link>
      </div>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider' + index}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movie.movies?.map((item, idx) => (
            <Movie key={idx} item={item} index={index} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
