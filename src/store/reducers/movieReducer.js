import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http_get } from "../../context/helper/axios";

const initialState = {
  movieCollection: [],
  searchMovie: [],
  movieDetail: {},
};

export const getMovieCollection = createAsyncThunk(
  "movie/get-movie-collection",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const searchMovie = createAsyncThunk(
  "movie/search-movie",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const movieDetail = createAsyncThunk(
  "movie/detail-movie",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const movieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    SAVEDMOVIE: (state, action) => {
      const index = action.payload.index;
      const idMovie = action.payload.id;
      const indexMovie = state.movieCollection[index].movies.findIndex(
        (idx) => {
          return idx.id === idMovie;
        }
      );
      const status = state.movieCollection[index].movies[indexMovie].savedMovie;
      state.movieCollection[index].movies[indexMovie].savedMovie = !status;
    },
    WATCHLATER: (state, action) => {
      const index = action.payload.index;
      const idMovie = action.payload.id;
      const indexMovie = state.movieCollection[index].movies.findIndex(
        (idx) => {
          return idx.id === idMovie;
        }
      );
      const status = state.movieCollection[index].movies[indexMovie].watchLater;
      state.movieCollection[index].movies[indexMovie].watchLater = !status;
      state.movieDetail.watchLater = !status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieCollection.fulfilled, (state, action) => {
        let addMarkParams = action.payload.data.results?.map((v) => ({
          ...v,
          savedMovie: false,
          watchLater: false,
        }));
        state.movieCollection[action.meta.arg.rowID] = {
          ...action.meta.arg,
          movies: [...addMarkParams],
        };
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        if (action.meta.arg.params.page > 1) {
          state.searchMovie.push(...action.payload.data.results);
        } else {
          state.searchMovie = action.payload.data.results
        }
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.movieDetail = {
          savedMovie: false,
          watchLater: false,
          ...action.payload.data,
        };
      });
  },
});

export const { SAVEDMOVIE, WATCHLATER } = movieReducer.actions;

// export const {} = movieReducer.actions;
export const selectMovieCollection = (state) => state.movie.movieCollection;
export const selectSearchMovie = (state) => state.movie.searchMovie;
export const selectMovieDetail = (state) => state.movie.movieDetail;

export default movieReducer.reducer;
