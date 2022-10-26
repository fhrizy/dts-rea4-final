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
    UPDATESAVEDMOVIE: (state, action) => {
      state.savedMovie.push(action.payload);
    },
    UPDATEWATCHLATER: (state, action) => {
      state.watchLater.push(action.payload);
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
