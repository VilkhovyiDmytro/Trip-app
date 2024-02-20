import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./citiesSlicer";
import { cityWeatherApi } from "./citiesWeatherApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    [cityWeatherApi.reducerPath]: cityWeatherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityWeatherApi.middleware),
});

setupListeners(store.dispatch);
