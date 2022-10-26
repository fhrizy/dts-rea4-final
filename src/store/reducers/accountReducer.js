import { createSlice } from "@reduxjs/toolkit";

const state = {
  savedMovie: [],
  watchLater: [],
};
const initialState = state;

const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    ADDSAVEDMOVIE: (state, action) => {
      state.savedMovie.push(action.payload);
    },
    REMOVESAVEDMOVIE: (state, action) => {
      state.savedMovie = state.savedMovie.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    ADDWATCHLATER: (state, action) => {
      state.watchLater.push(action.payload);
    },
    REMOVEWATCHLATER: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  ADDSAVEDMOVIE,
  REMOVESAVEDMOVIE,
  ADDWATCHLATER,
  REMOVEWATCHLATER,
} = accountReducer.actions;

export const selectSavedMovie = (state) => state.account.savedMovie;
export const selectWatchLater = (state) => state.account.watchLater;

export default accountReducer.reducer;
