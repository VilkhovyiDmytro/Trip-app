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
      query: (city) => `/${city}/${new Date().toISOString()}?key=${key}`,
    }),
    getWeatherOnTripPeriod: builder.query({
      query: (city, start, end) => `/${city}/${start}/${end}?key=${key}`,
    }),
  }),
});

export const {
  useGetWeatherOnTodayByCityNameQuery,
  useGetWeatherOnTripPeriodQuery,
} = cityWeatherApi;
