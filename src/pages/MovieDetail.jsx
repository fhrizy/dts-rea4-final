import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovieCollection,
  getMovieCollection,
  selectMovieDetail,
  movieDetail,
} from "../store/reducers/movieReducer";
import Main from "../components/Main";
import Row from "../components/Row";

function MovieDetail(props) {
  document.title = "Movie Detail";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mid } = useParams();
  const movies = useSelector(selectMovieCollection);
  const movie = useSelector(selectMovieDetail);
  const getIndex = mid?.split("-")[0];
  const getId = mid?.split("-")[1];

  useEffect(() => {
    if (movies.length === 0) {
      navigate("/");
    }
    dispatch(movieDetail({ fetchURL: `movie/${getId}?language=en-US` }));
    const params = {
      fetchURL: `movie/${getId}/recommendations?language=en-US`,
      rowID: "5",
      title: "Recomendations for you",
    };
    dispatch(getMovieCollection(params));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mid]);

  return (
    movies.length !== 0 && (
      <>
        <Main index={getIndex} movie={movie} />
        <Row index={"5"} movie={movies[5] !== undefined ? movies[5] : {}} />
      </>
    )
  );
}

export default MovieDetail;
