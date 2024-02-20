import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = "BY4LZT2TNW8WMV93A8AGUFY32";

export const cityWeatherApi = createApi({
  reducerPath: "weatherToday",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  }),
  endpoints: (builder) => ({
    getWeatherOnTodayByCityName: builder.query({
      query: (city) =>
        // `/${lat},${lng}/${new Date().toISOString()}?key=${key}`,
        `/${city}/today?unitGroup=metric&include=days&key=${key}&contentType=json`,
    }),
    getWeatherOnTripPeriod: builder.query({
      query: (lat, lng, start, end) =>
        `/${lat},${lng}/${start}/${end}?key=${key}`,
    }),
  }),
});

export const {
  useGetWeatherOnTodayByCityNameQuery,
  useGetWeatherOnTripPeriodQuery,
} = cityWeatherApi;
