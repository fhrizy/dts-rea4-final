import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./reducers/accountReducer";
import movieReducer from "./reducers/movieReducer";

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["movie", "account"],
  storage,
};

const rootReducer = combineReducers({
  account: accountReducer,
  movie: movieReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "movie/get-movie-collection/fulfilled",
          "movie/search-movie/fulfilled",
          "movie/detail-movie/fulfilled",
        ],
        ignoredPaths: ["payload.config.adapter"],
      },
    }),
});

export const persistor = persistStore(store);
