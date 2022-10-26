import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMovie, selectMovieCollection } from "../store/reducers/movieReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import Movie from "../components/Movie";
import Sekeleton from "../components/Sekeleton";

function MovieList() {
  document.title = "Movie List";
  const location = useLocation();
  const [page, setPage] = useState(
    new URLSearchParams(location.search).get("page") || 1
  );
  const movies = useSelector(selectMovieCollection);
  const query = new URLSearchParams(location.search).get("query") || "";
  const rowID = new URLSearchParams(location.search).get("rowID");
  const fetchURL = location.pathname;
  const dispatch = useDispatch();

  const queryChange = useMemo(() => {
    return { query: query?.toLowerCase(), page };
  }, [query, page]);

  useEffect(() => {
    if (query !== "") {
      dispatch(
        searchMovie({
          fetchURL: "search/movie",
          params: queryChange,
        })
      );
    } else {
      dispatch(
        searchMovie({
          fetchURL: fetchURL,
          params: { language: "en-US", page: queryChange.page },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryChange, location.pathname]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={movies?.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Sekeleton />}
      >
        <div className="pt-2 flex justify-center">
          <div className="w-5/6 mt-14">
            {movies[rowID]?.movies?.map((item, idx) => (
              <Movie key={idx} item={item} index={movies[rowID]?.rowID} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default MovieList;
