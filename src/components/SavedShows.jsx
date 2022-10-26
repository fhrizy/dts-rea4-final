import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATESAVEDMOVIE, UPDATEWATCHLATER } from '../store/reducers/accountReducer';
import { selectSavedMovie, selectWatchLater } from '../store/reducers/accountReducer';

const SavedShows = ({movie}) => {
  const getsavedMovie = useSelector(selectSavedMovie);
  const getwatchLater = useSelector(selectWatchLater);
  console.log(movie)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const remove = (id) => {
    const newSavedMovie = getsavedMovie?.movies.filter((movie) => movie.id !== id);
    const newWatchLater = getwatchLater?.movies.filter((movie) => movie.id !== id);
    console.log(newSavedMovie, newWatchLater)
    if (movie.rowID === 0){
      dispatch(UPDATESAVEDMOVIE({remove: true, movies: newSavedMovie[0] || []}));
    } else {
      dispatch(UPDATEWATCHLATER({remove: true, movies: newWatchLater[0] || []}));
    }
  }

  return (
    <>
      {movie?.movies?.length > 0 && <h2 className='text-white font-bold md:text-xl p-4'>{movie.title}</h2>}
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movie?.movies?.map((item, index) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p onClick={() => navigate(`/movie/detail/${item.rowID}-${item?.id}`)} className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>,
                <p onClick={() => remove(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
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

export default SavedShows;
