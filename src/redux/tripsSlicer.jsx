import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getTripsLS, setTripsLS } from "../helpers/tripsLS";
let today = new Date();
let twoDaysLater = new Date();
let fiveDaysLater = new Date();

twoDaysLater.setDate(today.getDate() + 2);
fiveDaysLater.setDate(today.getDate() + 5);

const initTrips = getTripsLS()
  ? getTripsLS()
  : [
      {
        id: nanoid(),
        startDate: twoDaysLater.toISOString().split("T")[0],
        endDate: fiveDaysLater.toISOString().split("T")[0],
        city: {
          lat: 49.55104439999999,
          lng: 25.5952184,
          name: "Ternopil,UA",
          description: "Ternopil, Ternopil Oblast, Ukraine",
          photo:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATplDJaYuajHxBiW5jIOg8DtMqdqRCjX5qf1pQrOKoTzgi84vP-eBKaSW8BVAub8HmyjGV_go8rSuKski1vhTfqGgtmqAaXheyU71HU0whI1DuDhnW52R3GOYIaR2Dtn0KB1bC1eDsydQBA7R22MJxuQg3wRDYHk8gWDUgaiJq3nMrv8gwx0&3u2592&5m1&2e1&callback=none&key=AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI&token=24276",
          refToGoogleMap:
            "https://maps.google.com/?q=Ternopil,+Ternopil+Oblast,+Ukraine,+46002&ftid=0x473036ad4b82ce75:0xc484a447edb154e8",
        },
      },
    ];

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    trips: initTrips,
  },

  reducers: (create) => ({
    addTrip: create.preparedReducer(
      (city) => {
        const newCity = { id: nanoid(), ...city };
        return { payload: newCity };
      },
      (state, action) => {
        setTripsLS([...state.trips, action.payload]);
        return {
          ...state,
          trips: [...state.trips, action.payload],
        };
      }
    ),
    deleteTrip: create.reducer((state, action) => {
      setTripsLS(state.trips.filter((city) => city.id !== action.payload));
      return {
        ...state,
        trips: state.trips.filter((city) => city.id !== action.payload),
      };
    }),
    setTrips: create.reducer((state, action) => {
      return {
        ...state,
        trips: action.payload,
      };
    }),
  }),
});

export const { addTrip, deleteTrip, setTrips } = tripsSlice.actions;

export default tripsSlice.reducer;
