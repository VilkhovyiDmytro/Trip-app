import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cityWeatherApi = createApi({
  reducerPath: "weatherToday",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  }),
  endpoints: (builder) => ({
    getWeatherOnTodayByCityName: builder.query({
      query: (city) =>
        `/${city}/today?unitGroup=metric&include=days&key=BY4LZT2TNW8WMV93A8AGUFY32&contentType=json`,
    }),
    getWeatherOnTripPeriod: builder.query({
      query: (city) => {
        return `/${city}?key=BY4LZT2TNW8WMV93A8AGUFY32`;
      },
    }),
  }),
});

export const {
  useGetWeatherOnTodayByCityNameQuery,
  useGetWeatherOnTripPeriodQuery,
} = cityWeatherApi;
