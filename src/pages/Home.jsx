import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectMovieCollection, getMovieCollection } from '../store/reducers/movieReducer';
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests';

const Home = () => {
  document.title = "NETTHINK";
  const movies = useSelector(selectMovieCollection);
  const moviesIndex = movies?.length >= 5 && Math.floor(Math.random() * movies?.length)
  const randomSubMovies = movies?.length >= 5 && movies[moviesIndex];
  const movie = movies?.length >= 5 && randomSubMovies?.movies[Math.floor(Math.random() * randomSubMovies.movies?.length)];
  const dispatch = useDispatch();

  useEffect(() => {
    requests.forEach((request) => {
      const params = { fetchURL: request.fetchURL, rowID: request.rowID, title: request.title };
      if (movies[request.rowID] === undefined) {
        try {
          dispatch(getMovieCollection(params));
        } catch (error) {
          console.log(error)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[requests])

  return (
    <>
        <Main index={moviesIndex} movie={movie} />
        {movies?.map((movie, idx) => (
          idx !== 5 && <Row key={idx} movie={movie} index={idx} />
        ))}
    </>
  )
}

export default Home