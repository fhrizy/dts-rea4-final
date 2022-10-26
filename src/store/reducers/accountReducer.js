import { createSlice } from "@reduxjs/toolkit";

const state = {
  savedMovie: {
    rowID: 0,
    title: "My Show",
    movies: [],
  },
  watchLater: {
    rowID: 1,
    title: "Watch Later",
    movies: [],
  },
};
const initialState = state;

const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    UPDATESAVEDMOVIE: (state, action) => {
      if (action.payload.remove === true) {
        state.savedMovie.movies = action.payload.movies;
      } else {
        state.savedMovie.movies.push(action.payload);
      }
    },
    UPDATEWATCHLATER: (state, action) => {
      console.log(action.payload);
      if (action.payload.remove === true) {
        state.watchLater.movies = action.payload.movies;
      } else {
        state.watchLater.movies.push(action.payload);
      }
    },
  },
});

export const {
  UPDATESAVEDMOVIE,
  UPDATEWATCHLATER,
} = accountReducer.actions;

export const selectSavedMovie = (state) => state.account.savedMovie;
export const selectWatchLater = (state) => state.account.watchLater;

export default accountReducer.reducer;
