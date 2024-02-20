import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchCities = createAsyncThunk("fetchTodo");

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    isLoading: false,
    isError: false,
  },
  reducers: (create) => ({
    addCity: create.preparedReducer(
      (city) => {
        const newCity = { id: nanoid(), ...city };
        return { payload: newCity };
      },
      (state, action) => {
        state.cities.push(action.payload);
      }
    ),
    deleteCity: create.reducer((state, action) => {
      return {
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    }),
  }),
});

export const { addCity, deleteCity } = citiesSlice.actions;

export default citiesSlice.reducer;
