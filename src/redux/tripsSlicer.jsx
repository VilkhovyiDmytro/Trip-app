import { createSlice, nanoid } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
  },
  reducers: (create) => ({
    addTrip: create.preparedReducer(
      (city) => {
        const newCity = { id: nanoid(), ...city };
        return { payload: newCity };
      },
      (state, action) => {
        state.trips.push(action.payload);
      }
    ),
    deleteTrip: create.reducer((state, action) => {
      return {
        ...state,
        trips: state.trips.filter((city) => city.id !== action.payload),
      };
    }),
    setTrips: create.reducer((state, action) => {
      return {
        trips: action.payload,
      };
    }),
  }),
});

export const { addTrip, deleteTrip, setTrips } = tripsSlice.actions;

export default tripsSlice.reducer;
