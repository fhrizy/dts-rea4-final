import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  movieDetail,
  selectMovieDetail,
  selectMovieCollection,
  getMovieCollection,
} from "../store/reducers/movieReducer";
import Main from "../components/Main";
import Row from "../components/Row";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const { mid } = useParams();
  const movies = useSelector(selectMovieCollection);
  const getIndex = mid?.split("-")[0];
  const getId = mid?.split("-")[1];
  const movie = movies[getIndex].movies?.filter((x) => x.id === Number(getId));
  useEffect(() => {
    const params = {
      fetchURL: `movie/${getId}/recommendations?language=en-US`,
      rowID: "5",
      title: "Recomendations for you",
    };
    dispatch(getMovieCollection(params));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mid]);

  return (
    <>
      <Main movie={movie[0]} />
      <Row index={5} movie={movies[5] !== undefined ? movies[5] : {}} />
    </>
  );
}

export default MovieDetail;
