import { configureStore } from "@reduxjs/toolkit";
import tripsReducer from "./tripsSlicer";
import { cityWeatherApi } from "./citiesWeatherApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    trips: tripsReducer,
    [cityWeatherApi.reducerPath]: cityWeatherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityWeatherApi.middleware),
});

setupListeners(store.dispatch);
